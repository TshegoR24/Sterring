import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";

/* ─── Types ────────────────────────────────────────────────────────────── */
export interface User {
  id: string;
  name: string;
  email: string;
}

interface StoredUser extends User {
  passwordHash: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => ({ success: false }),
  signup: async () => ({ success: false }),
  logout: () => {},
});

/* ─── Keys ─────────────────────────────────────────────────────────────── */
const USERS_KEY = "sterring_users";
const SESSION_KEY = "sterring_session";

/* ─── Simple hash (demo only — production uses bcrypt on a server) ───── */
const simpleHash = async (str: string): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(str);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
};

/* ─── Helpers ──────────────────────────────────────────────────────────── */
const getStoredUsers = (): StoredUser[] => {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const saveUsers = (users: StoredUser[]) =>
  localStorage.setItem(USERS_KEY, JSON.stringify(users));

const getSession = (): User | null => {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const saveSession = (user: User | null) => {
  if (user) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(SESSION_KEY);
  }
};

/* ─── Provider ─────────────────────────────────────────────────────────── */
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Restore session on mount
  useEffect(() => {
    const session = getSession();
    if (session) setUser(session);
    setIsLoading(false);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const users = getStoredUsers();
    const hash = await simpleHash(password);
    const found = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.passwordHash === hash
    );
    if (!found) {
      return { success: false, error: "Invalid email or password" };
    }
    const sessionUser: User = { id: found.id, name: found.name, email: found.email };
    setUser(sessionUser);
    saveSession(sessionUser);
    return { success: true };
  }, []);

  const signup = useCallback(async (name: string, email: string, password: string) => {
    const users = getStoredUsers();
    if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
      return { success: false, error: "An account with this email already exists" };
    }
    const hash = await simpleHash(password);
    const newUser: StoredUser = {
      id: crypto.randomUUID(),
      name,
      email,
      passwordHash: hash,
    };
    saveUsers([...users, newUser]);
    const sessionUser: User = { id: newUser.id, name: newUser.name, email: newUser.email };
    setUser(sessionUser);
    saveSession(sessionUser);
    return { success: true };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    saveSession(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, isLoading, login, signup, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

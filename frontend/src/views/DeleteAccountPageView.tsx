import React, { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import "@/css/styles.css";

const DeleteAccountPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleDeleteAccount = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    setShowPopup(true);
  };

  const confirmDeletion = async () => {
    const response = await fetch("http://localhost:5001/api/delete_account", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });

    const data = await response.json();

    if (data.success) {
      navigate("/");
    } else {
      setError(data.message);
    }
  };

  return (
    <main className="delete-account-page flex justify-center items-center h-screen">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Delete Account</CardTitle>
        </CardHeader>
        <form onSubmit={handleDeleteAccount}>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="e.g. user@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  placeholder="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit">Delete Account</Button>
          </CardFooter>
        </form>
        {showPopup && (
          <div className="popup-overlay">
            <div className="popup-content">
              <p>
                Are you sure you want to delete your account? This action is
                irreversible.
              </p>
              <div className="popup-buttons">
                <Button onClick={confirmDeletion} variant="destructive">
                  Confirm Deletion
                </Button>
                <Button onClick={() => setShowPopup(false)}>Cancel</Button>
              </div>
            </div>
          </div>
        )}
      </Card>
    </main>
  );
};

export default DeleteAccountPage;
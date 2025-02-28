"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ModeToggle from "@/components/mode-toggle";

export function Header() {
  const { data: session, status } = useSession();

  return (
    <header className="sticky top-0 z-50 w-full mx-auto border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-6xl container mx-auto flex h-14 items-center justify-center md:justify-end">
        <div className="flex items-center gap-4">
          <ModeToggle />
          {status === "authenticated" && session.user ? (
            <div className="flex items-center gap-4">
              <p className="text-sm text-muted-foreground">
                Welcome back,{" "}
                <span className="font-medium text-foreground">
                  {session.user.name}
                </span>
              </p>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={session.user.image || ""}
                        alt={session.user.name || ""}
                      />
                      <AvatarFallback>
                        {session.user.name?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => signOut()}>
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={() => signIn("github")}
              className="gap-2"
            >
              <Github className="h-4 w-4" />
              Sign in
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}

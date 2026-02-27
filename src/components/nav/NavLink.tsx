"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface NavLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

const NavLink = ({ href, children, className = "", onClick }: NavLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`
        relative
        tracking-wide
        transition-colors duration-300 text-gray-900 font-semibold ${className}`}
    >
      {children}

    </Link>
  );
};

export default NavLink;
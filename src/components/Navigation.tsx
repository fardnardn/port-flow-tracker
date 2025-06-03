
import { useState } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Ship, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DarkModeToggle } from "./DarkModeToggle"
import { useAuth } from "@/hooks/useAuth"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const { user, signOut } = useAuth()

  const navItems = [
    { name: "Features", href: "#features" },
    { name: "About", href: "#about" },
    { name: "Blog", href: "#blog" },
    { name: "Contact", href: "#contact" },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Ship className="text-blue-600 dark:text-blue-400" size={32} />
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              TrackPort
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                onClick={(e) => {
                  e.preventDefault()
                  const element = document.querySelector(item.href)
                  element?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <DarkModeToggle />
            {user ? (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Welcome back!
                </span>
                <Button variant="outline" size="sm" onClick={signOut}>
                  Sign Out
                </Button>
              </div>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost">Sign In</Button>
                </Link>
                <Link to="/signup">
                  <Button>Get Started</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <DarkModeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden border-t border-gray-200 dark:border-gray-700 py-4"
          >
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 px-2 py-1"
                  onClick={(e) => {
                    e.preventDefault()
                    const element = document.querySelector(item.href)
                    element?.scrollIntoView({ behavior: 'smooth' })
                    setIsOpen(false)
                  }}
                >
                  {item.name}
                </a>
              ))}
              {user ? (
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <Button variant="outline" size="sm" onClick={signOut} className="w-full">
                    Sign Out
                  </Button>
                </div>
              ) : (
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-2">
                  <Link to="/login" className="block">
                    <Button variant="ghost" className="w-full">Sign In</Button>
                  </Link>
                  <Link to="/signup" className="block">
                    <Button className="w-full">Get Started</Button>
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  )
}

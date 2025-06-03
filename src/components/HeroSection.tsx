
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Ship, Truck, CheckCircle, Shield } from "lucide-react"
import { Link } from "react-router-dom"

export function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          variants={floatingVariants}
          animate="animate"
          className="absolute top-20 left-10 text-blue-200 dark:text-blue-800"
        >
          <Ship size={40} />
        </motion.div>
        <motion.div
          variants={floatingVariants}
          animate="animate"
          style={{ animationDelay: "2s" }}
          className="absolute top-40 right-20 text-cyan-200 dark:text-cyan-800"
        >
          <Truck size={35} />
        </motion.div>
        <motion.div
          variants={floatingVariants}
          animate="animate"
          style={{ animationDelay: "4s" }}
          className="absolute bottom-40 left-20 text-green-200 dark:text-green-800"
        >
          <CheckCircle size={30} />
        </motion.div>
        <motion.div
          variants={floatingVariants}
          animate="animate"
          style={{ animationDelay: "1s" }}
          className="absolute bottom-20 right-10 text-purple-200 dark:text-purple-800"
        >
          <Shield size={45} />
        </motion.div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-4 text-center relative z-10"
      >
        <motion.div variants={itemVariants} className="mb-8">
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent mb-6">
            TrackPort
          </h1>
          <div className="flex items-center justify-center gap-2 mb-4">
            <Ship className="text-blue-600 dark:text-blue-400" size={32} />
            <span className="text-xl font-semibold text-gray-700 dark:text-gray-300">
              Smart Port Management
            </span>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="mb-8">
          <h2 className="text-2xl md:text-4xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Revolutionizing Port Operations
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Experience the future of port management with real-time tracking, 
            automated customs clearance, and seamless logistics coordination. 
            From arrival to delivery, we've got you covered.
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link to="/signup">
            <Button size="lg" className="px-8 py-4 text-lg bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
              Get Started
            </Button>
          </Link>
          <Link to="/login">
            <Button size="lg" variant="outline" className="px-8 py-4 text-lg border-2">
              Sign In
            </Button>
          </Link>
        </motion.div>

        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="flex flex-col items-center p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg">
            <Ship className="text-blue-600 dark:text-blue-400 mb-4" size={48} />
            <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">Real-time Tracking</h3>
            <p className="text-gray-600 dark:text-gray-400 text-center">Monitor your shipments from port arrival to final delivery</p>
          </div>
          <div className="flex flex-col items-center p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg">
            <Shield className="text-green-600 dark:text-green-400 mb-4" size={48} />
            <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">Secure & Compliant</h3>
            <p className="text-gray-600 dark:text-gray-400 text-center">Full compliance with customs and security regulations</p>
          </div>
          <div className="flex flex-col items-center p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg">
            <Truck className="text-purple-600 dark:text-purple-400 mb-4" size={48} />
            <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">Integrated Logistics</h3>
            <p className="text-gray-600 dark:text-gray-400 text-center">Seamless coordination with drivers and logistics partners</p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

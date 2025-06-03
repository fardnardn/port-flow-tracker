
import { motion } from "framer-motion"
import { Zap, Users, BarChart3, Clock, Globe, Smartphone } from "lucide-react"

export function FeaturesSection() {
  const features = [
    {
      icon: Zap,
      title: "Lightning Fast Processing",
      description: "Process shipments 10x faster with our AI-powered automation"
    },
    {
      icon: Users,
      title: "Multi-Role Dashboard",
      description: "Customized interfaces for customers, drivers, port staff, and customs"
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Real-time insights and predictive analytics for better decision making"
    },
    {
      icon: Clock,
      title: "24/7 Operations",
      description: "Round-the-clock monitoring and support for continuous operations"
    },
    {
      icon: Globe,
      title: "Global Integration",
      description: "Connect with ports, customs, and logistics networks worldwide"
    },
    {
      icon: Smartphone,
      title: "Mobile Ready",
      description: "Access all features on any device with our responsive design"
    }
  ]

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Powerful Features
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Everything you need to manage your port operations efficiently
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <feature.icon className="text-blue-600 dark:text-blue-400 mb-4" size={48} />
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

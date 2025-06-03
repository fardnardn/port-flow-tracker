
import { motion } from "framer-motion"
import { Users, Target, Award } from "lucide-react"

export function AboutSection() {
  return (
    <section className="py-20 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            About TrackPort
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            We're revolutionizing port management with cutting-edge technology and innovative solutions
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Our Mission
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
              To streamline global trade by providing the most advanced, user-friendly, and reliable port management system. 
              We believe that efficient ports are the backbone of international commerce, and we're committed to making 
              that efficiency accessible to everyone.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              With TrackPort, we're not just managing shipments – we're connecting the world, one port at a time.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 gap-6"
          >
            <div className="flex items-start space-x-4 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
              <Users className="text-blue-600 dark:text-blue-400 flex-shrink-0" size={32} />
              <div>
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Team Excellence</h4>
                <p className="text-gray-600 dark:text-gray-400">Expert team with decades of combined experience in logistics and technology</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-6 bg-green-50 dark:bg-green-900/20 rounded-xl">
              <Target className="text-green-600 dark:text-green-400 flex-shrink-0" size={32} />
              <div>
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Innovation Focus</h4>
                <p className="text-gray-600 dark:text-gray-400">Constantly evolving our platform with the latest technologies and industry insights</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-6 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
              <Award className="text-purple-600 dark:text-purple-400 flex-shrink-0" size={32} />
              <div>
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Proven Results</h4>
                <p className="text-gray-600 dark:text-gray-400">Trusted by major ports worldwide with 99.9% uptime and 50% efficiency improvements</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

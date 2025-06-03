
import { motion } from "framer-motion"
import { Calendar, User, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function BlogSection() {
  const blogPosts = [
    {
      title: "The Future of Port Automation",
      excerpt: "Discover how AI and IoT are revolutionizing port operations worldwide.",
      author: "Dr. Sarah Martinez",
      date: "December 15, 2024",
      image: "/placeholder.svg",
      category: "Technology"
    },
    {
      title: "Sustainable Shipping Practices",
      excerpt: "How green initiatives are shaping the future of maritime logistics.",
      author: "Captain James Wilson",
      date: "December 10, 2024",
      image: "/placeholder.svg",
      category: "Sustainability"
    },
    {
      title: "Global Trade Trends 2025",
      excerpt: "Key insights into emerging markets and shipping route optimization.",
      author: "Elena Rodriguez",
      date: "December 5, 2024",
      image: "/placeholder.svg",
      category: "Industry"
    }
  ]

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
            Latest Insights
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Stay updated with the latest trends and insights in port management and logistics
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {blogPosts.map((post, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.03 }}
              className="bg-gray-50 dark:bg-gray-700 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
              onClick={() => alert('Blog post coming soon!')}
            >
              <div className="h-48 bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center">
                <span className="text-white text-sm font-medium px-3 py-1 bg-black/20 rounded-full">
                  {post.category}
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <User size={14} />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar size={14} />
                      <span>{post.date}</span>
                    </div>
                  </div>
                  <ArrowRight size={16} className="text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => alert('Blog coming soon!')}
          >
            View All Articles
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

import { useState } from 'react'
import axiosInstance from '../api/axiosInstance'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'

import {
  ArrowUpRight,
  Brain,
  Target,
  TrendingUp,
  Send,
  MessageCircle,
  GraduationCap,
  Sparkles
} from 'lucide-react'

const learningFeatures = [
  {
    number: '01',
    tag: 'UNDERSTAND',
    icon: Brain,
    title: 'Understand beyond answers.',
    description:
      'Discover what you truly understand, identify knowledge gaps and recognize concepts that need more attention.'
  },
  {
    number: '02',
    tag: 'PERSONALIZE',
    icon: Target,
    title: 'A learning path that adapts.',
    description:
      'Get relevant lessons and targeted practice based on your assessment performance and areas for improvement.'
  },
  {
    number: '03',
    tag: 'IMPROVE',
    icon: TrendingUp,
    title: 'Make every attempt count.',
    description:
      'Revisit difficult topics, practice with purpose and track how your understanding develops over time.'
  }
]

const reveal = {
  hidden: { opacity: 0, y: 45 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut' }
  }
}

function AboutContact() {

    const[formData,setFormData]=useState({
        name:"",email:"",subject:"",message:""
    })
    const[formMessage,setFormMessage]=useState('')
    const[loading,setLoading]=useState(false)

    const handleChange=(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value})
    }
    const handleSubmit = async(e)=>{
        e.preventDefault()
        setLoading(true)
        setFormMessage('')
        try{
            const response = await axiosInstance.post('/contact',formData)
            setFormMessage(response.data.message)
            toast.success('Message sent successfully!')
            setFormData({name:'',email:'',subject:'',message:''})
        }catch(error){
            toast.error(error.response?.data?.message || 'Failed to send message')
        }finally{
            setLoading(false)
        }
    }

  return (
    <main className="about-contact-page">

      {/* ABOUT INTRODUCTION */}

      <section className="about-intro" id="about">

        <motion.div
          className="about-intro-content"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={reveal}
        >
          <h1>
            Learning is more than
            <span> collecting knowledge.</span>
          </h1>

          <p>
            A smarter learning experience designed to help you
            discover your strengths, understand your weaknesses
            and build skills with confidence.
          </p>

          <a href="#learning-philosophy" className="about-scroll-link">
            Discover our approach
            <ArrowUpRight size={17} />
          </a>
        </motion.div>

        <motion.div
          className="about-orbit"
          initial={{ opacity: 0, scale: 0.7, rotate: -15 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <div className="orbit-circle orbit-one"></div>
          <div className="orbit-circle orbit-two"></div>

          <div className="orbit-center">
            <GraduationCap size={48} />
          </div>

          <div className="orbit-item orbit-item-one">
            <Brain size={22} />
          </div>

          <div className="orbit-item orbit-item-two">
            <Target size={22} />
          </div>

          <div className="orbit-item orbit-item-three">
            <Sparkles size={22} />
          </div>
        </motion.div>

      </section>


      {/* LEARNING PHILOSOPHY */}

      <section className="learning-philosophy" id="learning-philosophy">

        <motion.div
          className="learning-heading"
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <span className="learning-eyebrow">
            <Sparkles size={15} />
            THE SKILLWEAVE APPROACH
          </span>

          <h2>
            Learn with purpose.
            <span> Grow with confidence.</span>
          </h2>

          <p>
            Real progress happens when you understand what you
            know, recognize what you don't and take the right
            steps to improve.
          </p>
        </motion.div>


        {/* STICKY STACKING CARDS */}

        <div className="learning-stack">

          {learningFeatures.map((feature, index) => {
            const Icon = feature.icon

            return (
              <motion.article
                className={`learning-stack-card learning-card-${index + 1}`}
                key={feature.number}
                initial={{ opacity: 0, y: 65 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.08,
                  ease: 'easeOut'
                }}
              >
                <div className="learning-card-top">
                  <span>{feature.number}</span>

                  <span className="learning-card-tag">
                    {feature.tag}
                  </span>
                </div>

                <div className="learning-card-content">
                  <div className="learning-card-icon">
                    <Icon size={30} />
                  </div>

                  <div>
                    <h3>{feature.title}</h3>
                    <p>{feature.description}</p>
                  </div>
                </div>

                <div className="learning-card-bottom">
                  <span>SKILLWEAVE</span>
                  <ArrowUpRight size={20} />
                </div>

              </motion.article>
            )
          })}

        </div>

      </section>


      {/* CONTACT SECTION */}

      <section className="contact-section" id="contact">

        <motion.div
          className="contact-heading"
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <span className="contact-label">
            <MessageCircle size={15} />
            GET IN TOUCH
          </span>

          <h2>
            Have something
            <span> on your mind?</span>
          </h2>

          <p>
            Have a question, suggestion or feedback?
            Send us a message. We'd love to hear from you.
          </p>
        </motion.div>


        <div className="contact-container">

          <motion.div
            className="contact-info"
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <span className="contact-small-label">
              LET'S CONNECT
            </span>

            <h3>
              Every great idea
              <br />
              starts with a
              <span> conversation.</span>
            </h3>

            <p>
              Whether you need help, have an idea or want
              to share feedback, we're ready to hear from you.
            </p>
          </motion.div>


          <motion.form
          onSubmit={handleSubmit}
            className="contact-form"
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h3>Send us a message</h3>

            <p>
              Tell us what you're thinking.
            </p>

            <div className="contact-input-row">

              <div className="contact-field">
                <label htmlFor="contact-name">Your name</label>
                <input
                value={formData.name} onChange={handleChange} required
                  type="text"
                  id="contact-name"
                  name="name"
                  placeholder="Enter your name"
                />
              </div>

              <div className="contact-field">
                <label htmlFor="contact-email">Email address</label>
                <input
            value={formData.email} onChange={handleChange} required
                  type="email"
                  id="contact-email"
                  name="email"
                  placeholder="Enter your email"
                />
              </div>

            </div>

            <div className="contact-field">
              <label htmlFor="contact-subject">Subject</label>
              <input
        value={formData.subject} onChange={handleChange} required
                type="text"
                id="contact-subject"
                name="subject"
                placeholder="What is this about?"
              />
            </div>

            <div className="contact-field">
              <label htmlFor="contact-message">Message</label>
              <textarea
        value={formData.message} onChange={handleChange} required
                id="contact-message"
                name="message"
                rows="5"
                placeholder="Write your message here..."
              />
            </div>

            <button type="submit" className="contact-submit" disabled={loading}>
                {loading?'Sending...':'Send Message'}
              <Send size={17} />
            </button>
            

            <span className="contact-form-note">
              Your message will be sent securely.
            </span>
          </motion.form>
        </div>
      </section>
    </main>
  )
}

export default AboutContact

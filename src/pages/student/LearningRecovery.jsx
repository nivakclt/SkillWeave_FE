
import {
  Brain, Target, AlertCircle, BookOpen, ArrowRight,
  RotateCcw, CheckCircle2, Lightbulb, TrendingUp,
  Clock3, ChevronRight
} from 'lucide-react'

function LearningRecovery() {
  const topics = [
    {
      name: 'React Hooks',
      subject: 'React Development',
      level: 'Needs Attention',
      score: 45,
      confidence: 'High confidence',
      description: 'Some answers suggest a possible misunderstanding of how React Hooks work.',
      lessons: 2,
      questions: 5
    },
    {
      name: 'JavaScript Closures',
      subject: 'JavaScript',
      level: 'Needs Practice',
      score: 65,
      confidence: 'Mixed confidence',
      description: 'You may benefit from additional practice with closure and scope concepts.',
      lessons: 1,
      questions: 4
    },
    {
      name: 'Array Methods',
      subject: 'JavaScript',
      level: 'Improving',
      score: 80,
      confidence: 'Good understanding',
      description: 'Your recent answers show improvement in this topic.',
      lessons: 1,
      questions: 3
    }
  ]

  const recommendations = [
    {
      title: 'Understanding useEffect',
      type: 'Recommended lesson',
      duration: '12 min',
      reason: 'Review how effects and dependencies work.',
      icon: BookOpen
    },
    {
      title: 'React Hooks Practice',
      type: 'Targeted practice',
      duration: '10 questions',
      reason: 'Strengthen your understanding with focused questions.',
      icon: Target
    },
    {
      title: 'Retest: React Hooks',
      type: 'Knowledge check',
      duration: '5 questions',
      reason: 'Check your understanding after revision.',
      icon: RotateCcw
    }
  ]

  return (
    <div className="recovery-page">

      <div className="recovery-heading">
        <div>
          <p className="section-eyebrow">PERSONALIZED LEARNING SUPPORT</p>
          <h1>Learning Recovery</h1>
          <p>Understand challenging topics and build stronger foundations.</p>
        </div>
        <div className="recovery-heading-icon">
          <Brain size={27} />
        </div>
      </div>

      <section className="recovery-hero">
        <div className="recovery-hero-content">
          <span><Brain size={15} /> MISCONCEPTION FINGERPRINT</span>
          <h2>Understand your learning gaps.<br />Turn them into strengths.</h2>
          <p>
            Your quiz answers and confidence levels help identify topics
            that may need more attention.
          </p>
          <div className="recovery-hero-note">
            <Lightbulb size={16} />
            <span>Personalized recommendations based on your learning patterns.</span>
          </div>
        </div>
        <div className="recovery-brain-visual">
          <div className="brain-orbit orbit-one" />
          <div className="brain-orbit orbit-two" />
          <div className="brain-center"><Brain size={67} /></div>
          <span className="brain-dot dot-one" />
          <span className="brain-dot dot-two" />
          <span className="brain-dot dot-three" />
        </div>
      </section>

      <div className="recovery-summary-grid">
        <div className="recovery-summary-card">
          <div className="summary-icon attention"><AlertCircle size={20} /></div>
          <div><strong>02</strong><span>Topics needing attention</span></div>
        </div>
        <div className="recovery-summary-card">
          <div className="summary-icon practice"><Target size={20} /></div>
          <div><strong>03</strong><span>Recommended activities</span></div>
        </div>
        <div className="recovery-summary-card">
          <div className="summary-icon improved"><TrendingUp size={20} /></div>
          <div><strong>01</strong><span>Topics improving</span></div>
        </div>
      </div>

      <section className="recovery-section">
        <div className="recovery-section-heading">
          <div>
            <h2>Your Learning Insights</h2>
            <p>Topics identified from your recent assessment patterns.</p>
          </div>
          <span className="insight-label">SAMPLE ANALYSIS</span>
        </div>

        <div className="recovery-topic-list">
          {topics.map((topic, index) => (
            <article className="recovery-topic-card" key={topic.name}>
              <div className="topic-card-top">
                <div className="topic-number">{String(index + 1).padStart(2, '0')}</div>
                <span className={`topic-level ${index === 2 ? 'improving' : ''}`}>
                  {topic.level}
                </span>
              </div>

              <h3>{topic.name}</h3>
              <p className="topic-subject">{topic.subject}</p>
              <p className="topic-description">{topic.description}</p>

              <div className="topic-score-row">
                <span>Assessment score</span>
                <strong>{topic.score}%</strong>
              </div>

              <div className="topic-score-track">
                <div
                  className={index === 2 ? 'score-improving' : ''}
                  style={{ width: `${topic.score}%` }}
                />
              </div>

              <div className="topic-confidence">
                <Brain size={14} />
                {topic.confidence}
              </div>

              <div className="topic-card-footer">
                <span>{topic.questions} related questions</span>
                <button aria-label={`View recommendations for ${topic.name}`}>
                  <ChevronRight size={19} />
                </button>
              </div>
            </article>
          ))}
        </div>

        <p className="recovery-disclaimer">
          These insights are learning indicators based on answer patterns,
          not definitive diagnoses of a student's understanding.
        </p>
      </section>

      <section className="recovery-section recommendations-section">
        <div className="recovery-section-heading">
          <div>
            <h2>Your Recovery Plan</h2>
            <p>Follow these activities to strengthen your understanding.</p>
          </div>
          <span className="plan-progress">0 of 3 completed</span>
        </div>

        <div className="recovery-plan-list">
          {recommendations.map((item, index) => {
            const Icon = item.icon

            return (
              <article className="recovery-plan-card" key={item.title}>
                <div className="plan-step">{index + 1}</div>
                <div className="plan-icon"><Icon size={21} /></div>

                <div className="plan-content">
                  <span>{item.type}</span>
                  <h3>{item.title}</h3>
                  <p>{item.reason}</p>
                  <small><Clock3 size={13} /> {item.duration}</small>
                </div>

                <button className="plan-action" aria-label={`Start ${item.title}`}>
                  <ArrowRight size={18} />
                </button>
              </article>
            )
          })}
        </div>
      </section>

      <section className="recovery-completion">
        <div className="completion-icon"><CheckCircle2 size={25} /></div>
        <div>
          <h3>Progress comes from consistent practice.</h3>
          <p>Revise, practise, and retest to track how your understanding improves.</p>
        </div>
      </section>

    </div>
  )
}

export default LearningRecovery

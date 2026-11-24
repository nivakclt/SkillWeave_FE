
import { useState } from 'react'
import {
  Search, SlidersHorizontal, Clock3, BookOpen,
  Star, ArrowUpRight
} from 'lucide-react'

function ExploreCourses() {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')

  const categories = [
    'All',
    'Frontend',
    'Backend',
    'Programming',
    'Design'
  ]

  const courses = [
    {
      id: 1,
      title: 'Complete React Development',
      instructor: 'Sarah Johnson',
      category: 'Frontend',
      level: 'Beginner',
      lessons: 24,
      duration: '12 hours',
      rating: 4.9,
      students: '2.4k',
      price: 'Free',
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=700'
    },
    {
      id: 2,
      title: 'Node.js Backend Development',
      instructor: 'Michael Smith',
      category: 'Backend',
      level: 'Intermediate',
      lessons: 20,
      duration: '14 hours',
      rating: 4.8,
      students: '1.8k',
      price: 'Free',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=700'
    },
    {
      id: 3,
      title: 'JavaScript Masterclass',
      instructor: 'David Miller',
      category: 'Programming',
      level: 'Beginner',
      lessons: 27,
      duration: '16 hours',
      rating: 4.9,
      students: '3.1k',
      price: 'Free',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=700'
    },
    {
      id: 4,
      title: 'UI/UX Design Fundamentals',
      instructor: 'Emily Carter',
      category: 'Design',
      level: 'Beginner',
      lessons: 20,
      duration: '10 hours',
      rating: 4.7,
      students: '1.2k',
      price: 'Free',
      image: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=700'
    },
    {
      id: 5,
      title: 'Advanced CSS and Responsive Design',
      instructor: 'James Wilson',
      category: 'Frontend',
      level: 'Intermediate',
      lessons: 18,
      duration: '9 hours',
      rating: 4.8,
      students: '980',
      price: 'Free',
      image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=700'
    },
    {
      id: 6,
      title: 'MongoDB for Developers',
      instructor: 'Daniel Brown',
      category: 'Backend',
      level: 'Intermediate',
      lessons: 16,
      duration: '8 hours',
      rating: 4.6,
      students: '850',
      price: 'Free',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=700'
    }
  ]

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase())

    const matchesCategory =
      activeCategory === 'All' ||
      course.category === activeCategory

    return matchesSearch && matchesCategory
  })

  return (
    <div className="explore-page">

      <div className="explore-heading">
        <div>
          <p className="section-eyebrow">EXPAND YOUR KNOWLEDGE</p>
          <h1>Explore Courses</h1>
          <p>Discover new skills and find your next learning journey.</p>
        </div>

        <div className="explore-total">
          <BookOpen size={21} />
          <div>
            <strong>{courses.length}</strong>
            <span>Available courses</span>
          </div>
        </div>
      </div>

      <div className="explore-banner">
        <div>
          <span>YOUR NEXT SKILL STARTS HERE</span>
          <h2>Learn something new.<br />Build something great.</h2>
          <p>Choose a course and take the next step towards your goals.</p>
        </div>
        <div className="explore-banner-icon">
          <BookOpen size={65} strokeWidth={1.2} />
        </div>
      </div>

      <div className="explore-toolbar">
        <div className="explore-search">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>

        <button className="explore-sort">
          <SlidersHorizontal size={16} />
          <span>Filters</span>
        </button>
      </div>

      <div className="explore-categories">
        {categories.map(category => (
          <button
            key={category}
            className={activeCategory === category ? 'explore-category active' : 'explore-category'}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="explore-results-heading">
        <div>
          <h2>Popular Courses</h2>
          <p>Find the right course for your learning goals.</p>
        </div>
        <span>{filteredCourses.length} courses found</span>
      </div>

      <div className="explore-grid">
        {filteredCourses.map(course => (
          <article className="explore-card" key={course.id}>

            <div className="explore-card-image">
              <img src={course.image} alt={course.title} />
              <span>{course.category}</span>
            </div>

            <div className="explore-card-content">
              <div className="explore-card-rating">
                <span><Star size={14} fill="currentColor" /> {course.rating}</span>
                <span>{course.students} students</span>
              </div>

              <h3>{course.title}</h3>
              <p className="explore-instructor">By {course.instructor}</p>

              <div className="explore-card-meta">
                <span><BookOpen size={14} /> {course.lessons} lessons</span>
                <span><Clock3 size={14} /> {course.duration}</span>
              </div>

              <div className="explore-card-footer">
                <div>
                  <strong>{course.price}</strong>
                  <span>{course.level}</span>
                </div>

                <button aria-label={`View ${course.title}`}>
                  <ArrowUpRight size={18} />
                </button>
              </div>
            </div>

          </article>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="explore-empty">
          <Search size={35} />
          <h3>No courses found</h3>
          <p>Try another search term or category.</p>
        </div>
      )}

    </div>
  )
}

export default ExploreCourses

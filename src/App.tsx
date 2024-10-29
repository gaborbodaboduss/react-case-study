import React, { useState } from 'react'; // Importing React and the useState hook for managing component state
import courseData from './data/courses.json'; // Importing course data from a JSON file
import { Course, Module, Lesson } from './types'; // Importing TypeScript types for Course, Module, and Lesson
import './App.css'; // Importing the CSS styles for the application

const App: React.FC = () => {
  // State to hold the array of courses loaded from JSON
  const [courses] = useState<Course[]>(courseData as Course[]);

  // State for the selected course, module, and lesson; initially set to null
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

  // State to hold the search term entered by the user
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Filter courses based on the search term in the title or description
  const filteredCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App">
      <h1>Online Course Catalogue</h1>

      {/* Render the course selection interface if no course is selected */}
      {!selectedCourse ? (
        <div className='courses'>
          {/* Input field for searching courses */}
          <input
            type="text"
            placeholder="Search for keywords"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm state on input change
          />

          {/* List of filtered courses based on the search term */}
          <ul>
            {filteredCourses.map((course) => (
              <li key={course.id} onClick={() => setSelectedCourse(course)}>
                {course.title} {/* Display course title */}
              </li>
            ))}
          </ul>
        </div>
      ) : !selectedModule ? (
        <div>
          {/* Button to go back to course selection */}
          <button onClick={() => setSelectedCourse(null)}>Back to courses</button>
          <h2>{selectedCourse.title}</h2> {/* Display the selected course title */}
          <p className="description">{selectedCourse.description}</p> {/* Display the selected course description */}
          <ul>
            {/* List modules of the selected course */}
            {selectedCourse.modules.map((module, idx) => (
              <li key={idx} onClick={() => setSelectedModule(module)}>
                {module.title} {/* Display module title */}
              </li>
            ))}
          </ul>
        </div>
      ) : !selectedLesson ? (
        <div>
          {/* Button to go back to module selection */}
          <button onClick={() => setSelectedModule(null)}>Back to modules</button>
          <h3>{selectedModule.title}</h3> {/* Display the selected module title */}
          <ul>
            {/* List lessons of the selected module */}
            {selectedModule.lessons.map((lesson, idx) => (
              <li key={idx} onClick={() => setSelectedLesson(lesson)}>
                {lesson.title} {/* Display lesson title */}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div>
          {/* Button to go back to lesson selection */}
          <button onClick={() => setSelectedLesson(null)}>Back to lessons</button>
          <h4>{selectedLesson.title}</h4> {/* Display the selected lesson title */}
          <p className="description">{selectedLesson.description}</p> {/* Display the selected lesson description */}

          {/* Display topics related to the selected lesson */}
          <h5>Topics</h5>
          <div className="topic-container">
            {selectedLesson.topics.map((topic, idx) => (
              <div className="topic-box" key={idx}>
                {topic} {/* Display each topic */}
              </div>
            ))}
          </div>

          {/* Render the content of the selected lesson based on its type */}
          {selectedLesson.content.map((content, idx) => (
            <div key={idx}>
              {content.type === "text" && <p className="text-content">{content.data}</p>} {/* Render text content */}
              {content.type === "video" && <video src={content.data} controls />} {/* Render video content */}
              {content.type === "youtube" && (
                <div className="youtube-container">
                  <iframe
                    width="560"
                    height="315"
                    src={content.data.replace("watch?v=", "embed/")} // Embed YouTube video
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              )}
              {content.type === "audio" && <audio src={content.data} controls />} {/* Render audio content */}
              {content.type === "podcast" && <audio src={content.data} controls />} {/* Render podcast content */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default App; // Exporting the App component for use in other parts of the application

import React, { useState } from "react";
// import axios from "axios";

function CourseForm() {
  const [courseTitle, setCourseTitle] = useState("");
  const [courseOutline, setCourseOutline] = useState([""]);

  const handleTitleChange = (e) => {
    setCourseTitle(e.target.value);
  };

  const handleOutlineChange = (index, e) => {
    const newOutline = [...courseOutline];
    newOutline[index] = e.target.value;
    setCourseOutline(newOutline);
  };

  const addOutlineItem = () => {
    setCourseOutline([...courseOutline, ""]);
  };

  const removeOutlineItem = (index) => {
    const newOutline = courseOutline.filter((_, i) => i !== index);
    setCourseOutline(newOutline);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const courseData = {
      courseTitle,
      courseOutline,
    };

    try {
      //   await axios.post("/api/courses", courseData);
      alert("Course saved successfully");
      setCourseTitle("");
      setCourseOutline([""]);
    } catch (error) {
      console.error("Error saving course:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Course Title:</label>
        <input
          type="text"
          value={courseTitle}
          onChange={handleTitleChange}
          required
        />
      </div>
      <div>
        <label>Course Outline:</label>
        {courseOutline.map((item, index) => (
          <div key={index}>
            <input
              type="text"
              value={item}
              onChange={(e) => handleOutlineChange(index, e)}
              required
            />
            <button type="button" onClick={() => removeOutlineItem(index)}>
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={addOutlineItem}>
          Add Outline Item
        </button>
      </div>
      <button type="submit">Save Course</button>
    </form>
  );
}

export default CourseForm;

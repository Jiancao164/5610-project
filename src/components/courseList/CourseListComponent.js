import CourseHeadingComponent from "./CourseHeadingComponent";
import CourseGridComponent from "./CourseGridComponent";
import CourseTableComponent from "./CourseTableComponent";
import React from "react";

const CourseListComponent =
    ({
         updateFormState,
         newCourseTitle,
         addCourse,
         toggle,
         deleteCourse,
         courses,
         layout,
         showEditor,
         editCourse,
    }) =>
<div>
    <CourseHeadingComponent/>
    <input
        onChange={updateFormState}
        value={newCourseTitle}
        placeholder="New Course Title"/>
    <button onClick={addCourse}>Add</button>
    <button onClick={toggle}>Toggle</button>
    {
        layout === "grid" &&
        <CourseGridComponent
            deleteCourse={deleteCourse}
            courses={courses}/>
    }
    {
        layout === "table"  &&
        <CourseTableComponent
            showEditor={showEditor}
            editCourse={editCourse}
            deleteCourse={deleteCourse}
            courses={courses}/>
    }
</div>

export default CourseListComponent

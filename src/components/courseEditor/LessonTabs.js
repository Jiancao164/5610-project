import React from "react";
import {connect} from "react-redux";
import {LESSONS_API_URL, MODULES_LESSONS_API_URL} from "../../common/constants";
import {updateLesson} from "../../services/LessonService";
import {Link} from "react-router-dom";

class LessonTabs extends React.Component {

    componentDidMount() {
        this.props.findLessonsForModule(this.props.moduleId)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
    if(this.props.moduleId !== prevProps.moduleId) {
            this.props.findLessonsForModule(this.props.moduleId)
        }
    }

    state = {
        selectedLessonId: '',
        editingLessonId: '',
        lesson: {
            title: '',
            _id: ''
        }
    }

    render() {
        return(
            <ul className="nav nav-tabs">
                {
                    this.props.lessons && this.props.lessons.map(lesson =>
                        <li className={`nav-item`}
                            onClick={() => this.setState({
                                selectedLessonId: lesson._id
                            })}
                            key={lesson._id}>
                            <Link to={`/course-editor/${this.props.courseId}/module/${this.props.moduleId}/lesson/${lesson._id}`}
                                  className={`nav-link
                                            ${(this.state.editingLessonId === lesson._id || this.state.selectedLessonId === lesson._id)?'active':''}`}>
                                {this.state.editingLessonId !== lesson._id &&
                                <span>{lesson.title}</span>}
                                {this.state.editingLessonId === lesson._id &&
                                <input
                                    onChange={(e) => {
                                        const newTitle = e.target.value
                                        this.setState(prevState => ({
                                            lesson: {
                                                ...prevState.lesson,
                                                title: newTitle
                                            }
                                        }))
                                    }}
                                    value={this.state.lesson.title}/>}
                                <button onClick={() =>
                                    {
                                        this.props.updateLesson(this.state.lesson)
                                            .then(() =>
                                                this.setState({
                                                    editingLessonId: ''
                                                })
                                            )
                                    }
                                }>
                                    Save
                                </button>
                                <button onClick={
                                    () => this.props.deleteLesson(lesson._id)}>
                                    X
                                </button>
                                <button onClick={() => {
                                    this.setState({
                                        lesson: lesson,
                                        editingLessonId: lesson._id
                                    })
                                }}>
                                    Edit
                                </button>
                            </Link>
                        </li>)
                }
                <li className="nav-item">
                    <button onClick={() => this.props.addLesson(this.props.moduleId)}>+</button>
                </li>
            </ul>
        )
    }
}


const stateToPropertyMapper = (state) => ({
    lessons: state.lessons.lessons
})

const dispatcherToPropertyMapper = (dispatcher) => ({
    findLessonsForModule: moduleId =>
        fetch(MODULES_LESSONS_API_URL(moduleId))
            .then(response => response.json())
            .then(lessons => dispatcher({
                type: 'FIND_LESSONS_FOR_MODULE',
                lessons: lessons
            })),
    updateLesson: async (lesson) => {
        const actualLesson = await updateLesson(lesson)
        dispatcher({
            type: 'UPDATE_LESSON',
            lesson: actualLesson,
            lessonId: actualLesson._id
        })
    },
    addLesson: (moduleId) =>
        fetch(MODULES_LESSONS_API_URL(moduleId), {
            method: 'POST',
            body: JSON.stringify({title: 'New Lesson'}),
            headers: {
                'content-type': 'application/json'
            }
        }).then(response => response.json())
            .then(actualLesson =>
                dispatcher({
                    type: 'CREATE_LESSON',
                    lesson: actualLesson
                })),
    deleteLesson: (lessonId) =>
        fetch(`${LESSONS_API_URL}/${lessonId}`, {
            method: 'DELETE'
        }).then(response => response.json())
            .then(status =>
                dispatcher({
                    type: 'DELETE_LESSON',
                    lessonId: lessonId
                })),
    findAllLessons: () =>
        fetch(LESSONS_API_URL)
            .then(response => response.json())
            .then(lessons =>
                dispatcher({
                    type: 'FIND_ALL_LESSONS',
                    lessons: lessons
                })
            )
})

export default connect(
    stateToPropertyMapper,
    dispatcherToPropertyMapper
)(LessonTabs)

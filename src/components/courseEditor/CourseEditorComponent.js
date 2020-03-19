import React from "react";
import ModuleList from "./ModuleListComponent";
import LessonTabs from "./LessonTabs";
import {Link} from "react-router-dom";
import {combineReducers, createStore} from "redux";
import {Provider} from "react-redux";
import modules from '../../reducers/modules'
import lessons from '../../reducers/lessons'
import widgets from '../../reducers/widgetReducer'
import topics from "../../reducers/topicReducer";
import ModuleListContainer from "../../containers/ModuleListContaner";
import WidgetList from "./WidgetList";
import TopicPills from "./TopicPills";

const reducers = combineReducers({
    modules, lessons, widgets, topics
})

const store = createStore(reducers)

const CourseEditorComponent = ({hideEditor, match, courseId, moduleId, lessonId, topicId, history}) =>
    <Provider store={store}>
        <div>
            <button onClick={() => {
                history.push("/")
            }}>
                Close
            </button>
            <Link to="/">
                Back
            </Link>
            <h3>Course Editor {courseId}</h3>
            <div className="row">
                <div className="col-3">
                    <ModuleListContainer
                        moduleId={moduleId}
                        history={history}
                        courseId={courseId}/>
                </div>
                <div className="col-9">
                    <LessonTabs
                        courseId={courseId}
                        moduleId={moduleId}/>
                    <TopicPills
                        courseId={courseId}
                        moduleId={moduleId}
                        lessonId={lessonId}
                        topicId={topicId}/>
                    <WidgetList
                        courseId={courseId}
                        moduleId={moduleId}
                        lessonId={lessonId}
                        topicId={topicId}/>
                </div>
            </div>
        </div>
    </Provider>
export default CourseEditorComponent

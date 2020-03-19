import React from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";

class TopicPills extends React.Component {
    componentDidMount() {
        this.props.findTopicsForLesson(this.props.lessonId)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.lessonId !== this.props.lessonId) {
            this.props.findTopicsForLesson(this.props.lessonId)
        }
    }

    render() {
        return (
            <div>
                <br/>
                <ul className="nav nav-pills">
                {
                    this.props.topics.map(topic =>
                        <li className="nav-item" key={topic.id}>
                            <Link to={`/course-editor/${this.props.courseId}/module/${this.props.moduleId}/lesson/${this.props.lessonId}/topic/${topic.id}`}
                                className={`nav-link ${this.props.topicId == topic.id ? 'active':''}`} href="#">
                                {topic.title}
                            </Link>
                        </li>
                    )
                }
                    <li className="nav-item">
                        <a onClick={() =>
                            this.props.createTopicForLesson
                            (this.props.lessonId, {title: "New Topic"})} href="#" className="btn btn-primary">
                            +
                        </a>
                    </li>
                </ul>
                <br/>
            </div>
        );
    }
}

const stateMapper = (state) => ({
    topics: state.topics.topics
})

const dispatcherMapper = (dispatch) => ({
    createTopicForLesson: (lessonId, newTopic) =>
        fetch(`http://localhost:8080/api/lessons/${lessonId}/topics`, {
            method: 'POST',
            body: JSON.stringify(newTopic),
            headers: {
                'content-type': 'application/json'
            }
        }).then(response => response.json())
            .then(newTopic => dispatch({
                type: 'CREATE_TOPIC',
                topic: newTopic
            })),
    findTopicsForLesson: (lessonId) =>
        fetch(`http://localhost:8080/api/lessons/${lessonId}/topics`)
            .then(response => response.json())
            .then(topics => dispatch({
                type: 'FIND_ALL_TOPICS',
                topics: topics
            })),
    findAllTopics: () =>
        fetch("http://localhost:8080/api/topics")
            .then(response => response.json())
            .then(topics => dispatch({
                type: 'FIND_ALL_TOPICS',
                topics: topics
            }))
})

export default connect
(stateMapper, dispatcherMapper)(TopicPills);

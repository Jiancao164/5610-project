import React from "react";
import {connect} from "react-redux";
import service from "../services/ModuleService";
import {findModulesForCourse, createModule} from "../actions/moduleActions";
import ModuleListComponent from "../components/courseEditor/ModuleListComponent";

const stateToPropertyMapper = (state) => ({
    modules: state.modules.modules
})

const dispatchToPropertyMapper = (dispatch) => ({
    createModule: (courseId, module) =>
        service.createModule(courseId, module)
            .then(actualModule =>
                dispatch(createModule(actualModule))),
    findModulesForCourse: (courseId) =>
        service.findModuleForCourse(courseId)
            .then(modules =>
                dispatch(findModulesForCourse(modules)))
})

const ModuleListContainer = connect(
    stateToPropertyMapper,
    dispatchToPropertyMapper
)(ModuleListComponent)

export default ModuleListContainer

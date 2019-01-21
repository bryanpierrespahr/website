import axios from 'axios';

const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
}

const burl = "http://192.168.0.101:3001";

export default {

    login: function (send) {
        return fetch(burl + '/user/login', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(send)
        })
    },

    signup: function (send) {

        return fetch(burl + '/user/signup', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(send)
        })
    },


    isAuth: function () {
        return (sessionStorage.getItem('token') !== null);
    },
    logout: function () {
        sessionStorage.clear();
    },

    getStudent: function (studentId) {
        return axios.get(burl + "/student/" + studentId)
    },

    getAllStudents: function () {
        return axios.get(burl + "/student");
    },

    getAllCourses: function () {
        return axios.get(burl + "/course");
    },

    getCourse: function (courseId) {
        return axios.get(burl + "/course/" + courseId);
    },

    getWeek: function (weekId) {
        return axios.get(burl + "/week/" + weekId);
    },

    getLink: function (linkId) {
        return axios.get(burl + "/link/" + linkId);
    },

    getLecture: function (lectureId) {
        return axios.get(burl + "/lecture/" + lectureId);
    },

    getAllTeachers: function () {
        return axios.get(burl + "/teacher");
    },

    getTeacher: function (teacherId) {
        return axios.get(burl + "/teacher/" + teacherId);
    },

    patchTimeSpent: function (studentId, courses) {
        return axios.patch(burl + "/student/" + studentId, [{
                "propName": "courses", "value": courses
            }]
            , {
                headers: headers
            })
    },

    patchDoneArray: function (studentId, courses) {
        return axios.patch(burl + "/student/" + studentId, [{
                "propName": "courses", "value": courses
            }]
            , {
                headers: headers
            })
    },

    patchPercentage: function (studentId, courses) {
        return axios.patch(burl + "/student/" + studentId, [{
                "propName": "courses", "value": courses
            }]
            , {
                headers: headers
            })
    },

    patchQuizResult: function (studentId, courses) {
        return axios.patch(burl + "/student/" + studentId, [{
                "propName": "courses", "value": courses
            }]
            , {
                headers: headers
            })
    },

    patchGlobalScore: function (studentId, courses) {
        return axios.patch(burl + "/student/" + studentId, [{
                "propName": "courses", "value": courses
            }]
            , {
                headers: headers
            })
    },

    patchCourse: function (courseId, course) {
        return axios.patch(burl + "/course/" + courseId, [{
                "propName": "name", "value": course.name
            }, {
                "propName": "code", "value": course.code
            }, {
                "propName": "scope", "value": course.scope
            }, {
                "propName": "timing", "value": course.timing
            }, {
                "propName": "language", "value": course.language
            }, {
                "propName": "level", "value": course.level
            }, {
                "propName": "type", "value": course.type
            }, {
                "propName": "objectives", "value": course.objectives
            }, {
                "propName": "teacherId", "value": course.teacherId
            }]
            , {
                headers: headers
            })
    },


    patchStudent: function (studentId, student) {
        return axios.patch(burl + "/student/" + studentId, [{
                "propName": "firstName", "value": student.firstName
            }, {
                "propName": "lastName", "value": student.lastName
            }, {
                "propName": "email", "value": student.email
            }, {
                "propName": "number", "value": student.number
            }]
            , {
                headers: headers
            })
    },

    patchTeacher: function (teacherId, teacher) {
        return axios.patch(burl + "/teacher/" + teacherId, [{
                "propName": "firstName", "value": teacher.firstName
            }, {
                "propName": "lastName", "value": teacher.lastName
            }, {
                "propName": "email", "value": teacher.email
            }]
            , {
                headers: headers
            })
    },

    postCourse: function (course) {
        return axios.post(burl + '/course', course, {headers: headers})
    },

    postStudent: function (student) {
        return axios.post(burl + '/student', student, {headers: headers})
    },

    postTeacher: function (teacher) {
        return axios.post(burl + '/teacher', teacher, {headers: headers})
    },

    postLecture: function (lecture) {
        return axios.post(burl + '/lecture', lecture, {headers: headers})
    },

    postLink: function (link) {
        return axios.post(burl + '/link', link, {headers: headers})
    },

    postQuiz: function (quiz) {
        return axios.post(burl + '/quiz', quiz, {headers: headers})
    },

    deleteCourse: function (courseId) {
        return axios.delete(burl + '/course/' + courseId);
    },

    deleteStudent: function (studentId) {
        return axios.delete(burl + '/student/' + studentId);
    },

    deleteTeacher: function (teacherId) {
        return axios.delete(burl + '/teacher/' + teacherId);
    }

}
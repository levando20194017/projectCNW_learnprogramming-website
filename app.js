var courseManager = {
    courses: [{
        name: "Lập trình JavaScript cơ bản",
        lectures: [
            {
                name: "Giới thiệu về JavaScript",
                video: "https://www.youtube.com/watch?v=1dLBRKsI5Rw"
            },
            {
                name: "Các kiểu dữ liệu trong JavaScript",
                video: "https://www.youtube.com/watch?v=Zz1vxfJYrWs"
            },
            {
                name: "Các hàm trong JavaScript",
                video: "https://www.youtube.com/watch?v=Uc1xvJw1EYc"
            }
        ]
    },
    {
        name: "Lập trình web với HTML, CSS và JavaScript",
        lectures: [
            {
                name: "Giới thiệu về HTML",
                video: "https://www.youtube.com/watch?v=P6y2xN3g2sY"
            },
            {
                name: "Tạo bố cục với CSS",
                video: "https://www.youtube.com/watch?v=1PnVor36_40"
            },
            {
                name: "Các hiệu ứng và chuyển động với JavaScript",
                video: "https://www.youtube.com/watch?v=4XpBug8dWqo"
            }
        ]
    }],
    // Thêm khóa học vào danh sách khóa học
    addCourse: function (courseName) {
        this.courses.push({
            name: courseName,
            lectures: []
        });
    },

    // Xóa khóa học khỏi danh sách khóa học
    deleteCourse: function (courseIndex) {
        this.courses.splice(courseIndex, 1);
    },

    // Thêm bài giảng vào danh sách bài giảng của một khóa học
    addLecture: function (courseIndex, lectureName, videoLink) {
        this.courses[courseIndex].lectures.push({
            name: lectureName,
            video: videoLink
        });
    },

    // Chỉnh sửa thông tin khóa học
    editCourse: function (courseIndex, newCourseName) {
        this.courses[courseIndex].name = newCourseName;
    },

    // Chỉnh sửa thông tin bài giảng
    editLecture: function (courseIndex, lectureIndex, newLectureName, newVideoLink) {
        this.courses[courseIndex].lectures[lectureIndex].name = newLectureName;
        this.courses[courseIndex].lectures[lectureIndex].video = newVideoLink;
    },

    // Xóa bài giảng khỏi danh sách bài giảng của một khóa học
    deleteLecture: function (courseIndex, lectureIndex) {
        this.courses[courseIndex].lectures.splice(lectureIndex, 1);
    }
};

// Lấy các phần tử HTML cần thiết
var courseList = document.getElementById("course-list");
var lectureList = document.getElementById("lecture-list");
var addCourseBtn = document.getElementById("add-course-btn");
var addLectureBtn = document.getElementById("add-lecture-btn");
var modal = document.getElementById("modal");
var closeBtn = document.getElementsByClassName("close")[0];
var courseForm = document.getElementById("course-form");
var lectureForm = document.getElementById("lecture-form");
var formTitle = document.getElementById("form-title");
var lectureFormTitle = document.getElementById("lecture-form-title");

// Hàm hiển thị danh sách khóa học
function displayCourses() {
    // Xóa danh sách khóa học hiện tại
    courseList.innerHTML = "";
    // Lặp qua danh sách khóa học và hiển thị lên trang web
    for (var i = 0; i < courseManager.courses.length; i++) {
        var course = courseManager.courses[i];
        var li = document.createElement("li");
        li.textContent = course.name;
        li.setAttribute("data-course-index", i);
        courseList.appendChild(li);
    }
}

// Hàm hiển thị danh sách bài giảng của một khóa học
function displayLectures(courseIndex) {
    // Xóa danh sách bài giảng hiện tại
    lectureList.innerHTML = "";
    // Lặp qua danh sách bài giảng của khóa học và hiển thị lên trang web
    var lectures = courseManager.courses[courseIndex].lectures;
    for (var i = 0; i < lectures.length; i++) {
        var lecture = lectures[i];
        var li = document.createElement("li");
        li.textContent = lecture.name;
        li.setAttribute("data-course-index", courseIndex);
        li.setAttribute("data-lecture-index", i);
        lectureList.appendChild(li);
    }
}

// Hàm hiển thị Modal để thêm hoặc chỉnh sửa khóa học hoặc bài giảng
function displayModal(formType, courseIndex, lectureIndex) {
    // Hiển thị Modal
    modal.style.display = "block";
    // Nếu đang thêm khóa học
    if (formType === "add-course") {
        formTitle.textContent = "Thêm khóa học";
        courseForm.style.display = "block";
        lectureForm.style.display = "none";
    }
    // Nếu đang thêm bài giảng
    else if (formType === "add-lecture") {
        lectureFormTitle.textContent = "Thêm bài giảng";
        courseForm.style.display = "none";
        lectureForm.style.display = "block";
    }
    // Nếu đang chỉnh sửa khóa học
    else if (formType === "edit-course") {
        formTitle.textContent = "Chỉnh sửa khóa học";
        courseForm.style.display = "block";
        lectureForm.style.display = "none"
    }
    // Nếu đang chỉnh sửa bài giảng
    else if (formType === "edit-lecture") {
        lectureFormTitle.textContent = "Chỉnh sửa bài giảng";
        courseForm.style.display = "none";
        lectureForm.style.display = "block";
    }

    // Nếu đang chỉnh sửa, hiển thị thông tin khóa học hoặc bài giảng cần chỉnh sửa trong form
    if (formType === "edit-course" || formType === "edit-lecture") {
        var course = courseManager.courses[courseIndex];
        var lecture = course.lectures[lectureIndex];
        if (formType === "edit-course") {
            document.getElementById("course-name").value = course.name;
        } else {
            document.getElementById("lecture-name").value = lecture.name;
            document.getElementById("video-link").value = lecture.video;
        }
    }
}

// Hàm đóng Modal
function closeModal() {
    modal.style.display = "none";
    courseForm.reset();
    lectureForm.reset();
}

// Sự kiện click vào nút Thêm khóa học
addCourseBtn.addEventListener("click", function () {
    displayModal("add-course");
});

// Sự kiện click vào nút Thêm bài giảng
addLectureBtn.addEventListener("click", function () {
    displayModal("add-lecture");
});

// Sự kiện click vào nút đóng Modal
closeBtn.addEventListener("click", function () {
    closeModal();
});

// Sự kiện submit form Thêm hoặc Chỉnh sửa khóa học
courseForm.addEventListener("submit", function (event) {
    event.preventDefault();
    var courseName = document.getElementById("course-name").value;
    var formType = formTitle.textContent;
    var courseIndex = courseForm.getAttribute("data-course-index");

    // Nếu đang thêm khóa học
    if (formType === "Thêm khóa học") {
        courseManager.addCourse(courseName);
    }
    // Nếu đang chỉnh sửa khóa học
    else if (formType === "Chỉnh sửa khóa học") {
        courseManager.editCourse(courseIndex, courseName);
    }

    closeModal();
    displayCourses();
});

// Sự kiện submit form Thêm hoặc Chỉnh sửa bài giảng
lectureForm.addEventListener("submit", function (event) {
    event.preventDefault();
    var lectureName = document.getElementById("lecture-name").value;
    var videoLink = document.getElementById("video-link").value;
    var formType = lectureFormTitle.textContent;
    var courseIndex = lectureForm.getAttribute("data-course-index");
    var lectureIndex = lectureForm.getAttribute("data-lecture-index");

    // Nếu đang thêm bài giảng
    if (formType === "Thêm bài giảng") {
        courseManager.addLecture(courseIndex, lectureName, videoLink);
    }
    // Nếu đang chỉnh sửa bài giảng
    else if (formType === "Chỉnh sửa bài giảng") {
        courseManager.editLecture(courseIndex, lectureIndex, lectureName, videoLink);
    }

    closeModal();
    displayLectures(courseIndex);
});

// Sự kiện click vào một khóa học trong danh sách khóa học
courseList.addEventListener("click", function (event) {
    var courseIndex = event.target.getAttribute("data-course-index");
    displayLectures(courseIndex);
});

// Sự kiện click vào một bài giảng trong danh sách bài giảng
lectureList.addEventListener("click", function (event) {
    var courseIndex = event.target.getAttribute("data-course-index");
    var lectureIndex = event.target.getAttribute("data-lecture-index");
    displayModal("edit-lecture", courseIndex, lectureIndex);
});

// Khởi tạo danh sách khóa học ban đầu
courseManager.addCourse("Khóa học 1");
courseManager.addCourse("Khóa học 2");

// Hiển thị danh sách khóa học ban đầu
displayCourses();
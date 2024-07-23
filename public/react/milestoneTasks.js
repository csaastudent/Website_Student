var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Task = function (_React$Component) {
    _inherits(Task, _React$Component);

    function Task() {
        _classCallCheck(this, Task);

        return _possibleConstructorReturn(this, (Task.__proto__ || Object.getPrototypeOf(Task)).apply(this, arguments));
    }

    _createClass(Task, [{
        key: "render",
        value: function render() {

            return React.createElement(
                "div",
                null,
                "asd"
            );
        }
    }]);

    return Task;
}(React.Component);

var Whole = function (_React$Component2) {
    _inherits(Whole, _React$Component2);

    function Whole() {
        _classCallCheck(this, Whole);

        return _possibleConstructorReturn(this, (Whole.__proto__ || Object.getPrototypeOf(Whole)).apply(this, arguments));
    }

    _createClass(Whole, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this3 = this;

            var Http = new XMLHttpRequest();
            Http.open("GET", "/getpageinfo" + window.location.pathname);
            Http.send();

            Http.onreadystatechange = function (e) {
                if (Http.readyState == 4 && Http.status == 200) {
                    var res = JSON.parse(Http.responseText)[0];
                    console.log(res);
                    var pathname = window.location.pathname;
                    var paths = pathname.split('/');
                    console.log(paths);

                    tasks = [];

                    var i = 0;

                    ; // leave this semicolon here or the JSX compiler will think the next line is part of the previous
                    ['lesson', 'a', 'b', 'c'].forEach(function (element) {
                        var downloadbutton;
                        console.log(res.outline);
                        if (i > 0 && Object.entries(res.outline) != 0) {
                            if (Object.entries(res.outline)[i - 1][1] != "") {
                                var downloadbutton = React.createElement(
                                    "a",
                                    { href: "/" + paths[2] + "/" + paths[3] + "/" + paths[4] + "/" + Object.entries(res.outline)[i - 1][1] },
                                    React.createElement("img", { src: "/picture/download-icon.png", height: "20", className: "middle", style: { 'paddingLeft': '20px' } })
                                );
                            }
                        }

                        if (res.files.includes(element + '.mkv') || res.files.includes(element + '.mp4')) {
                            // VIDEO TYPE FILE

                            var source = res.files.includes(element + '.mkv') ? element + '.mkv' : element + '.mp4';
                            source = "/" + paths[2] + "/" + paths[3] + "/" + paths[4] + "/" + source;

                            var taskCaption = "";
                            if (element == 'lesson') {
                                taskCaption = "Lesson";
                            } else {
                                taskCaption = "Task " + element.toUpperCase();
                            }

                            tasks.push(React.createElement(
                                "figure",
                                { className: "tasks name" },
                                React.createElement(
                                    "video",
                                    { width: "300", height: "300", controls: true },
                                    React.createElement("source", { src: source, type: "video/mp4" })
                                ),
                                React.createElement(
                                    "b",
                                    null,
                                    React.createElement(
                                        "figcaption",
                                        null,
                                        taskCaption,
                                        " ",
                                        downloadbutton
                                    )
                                )
                            ));
                        } else if (res.files.includes(element + '.pdf')) {
                            // PDF TYPE FILE
                            var source = element + '.pdf';
                            source = "/" + paths[2] + "/" + paths[3] + "/" + paths[4] + "/" + source;

                            var imgsource = "/" + paths[2] + "/" + paths[3] + "/" + paths[4] + "/" + element;['.jpg', '.png', '.jpeg'].some(function (imgType) {
                                console.log(element + imgType);
                                if (res.files.includes(element + imgType)) {
                                    imgsource += imgType;
                                    return;
                                }
                            });

                            var taskCaption = "";
                            if (element == 'lesson') {
                                taskCaption = "Lesson";
                            } else {
                                taskCaption = "Task " + element.toUpperCase();
                            }

                            tasks.push(React.createElement(
                                "figure",
                                { className: "tasks name" },
                                React.createElement(
                                    "a",
                                    { href: source },
                                    React.createElement("img", { width: "300", height: "300", src: imgsource })
                                ),
                                React.createElement(
                                    "b",
                                    null,
                                    React.createElement(
                                        "figcaption",
                                        null,
                                        taskCaption,
                                        " ",
                                        downloadbutton
                                    )
                                )
                            ));
                        }
                        i++;
                    });

                    _this3.setState({
                        result: res,
                        tasks: tasks
                    });
                }
            };
        }
    }, {
        key: "render",
        value: function render() {
            if (!this.state) return null;

            return React.createElement(
                "div",
                { className: "name wedopic" },
                this.state.lesson,
                this.state.tasks
            );
        }
    }]);

    return Whole;
}(React.Component);

var domContainer2 = document.getElementsByClassName("Whole");
var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
    for (var _iterator = domContainer2[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var element = _step.value;

        var root2 = ReactDOM.createRoot(element);
        root2.render(React.createElement(Whole, null));
    }
} catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
} finally {
    try {
        if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
        }
    } finally {
        if (_didIteratorError) {
            throw _iteratorError;
        }
    }
}
class Task extends React.Component {

    render() {

        return ( 
            <div>asd</div>
        )
    }
}

class Whole extends React.Component {

    componentDidMount(){
        const Http = new XMLHttpRequest();
        Http.open("GET", "/getpageinfo" + window.location.pathname)
        Http.send()
        
        Http.onreadystatechange = (e) => {
            if (Http.readyState == 4 && Http.status == 200) {
                var res = JSON.parse(Http.responseText)[0]
                console.log(res);
                var pathname = window.location.pathname
                var paths = pathname.split('/')
                console.log(paths)

                tasks = []


                var i = 0;

                ;// leave this semicolon here or the JSX compiler will think the next line is part of the previous
                ['lesson', 'a', 'b', 'c'].forEach(element => {
                    var downloadbutton
                    console.log(res.outline)
                    if (i > 0 && Object.entries(res.outline) != 0) {
                        if (Object.entries(res.outline)[i-1][1] != "") {
                            var downloadbutton = (
                                <a href={`/${paths[2]}/${paths[3]}/${paths[4]}/` + Object.entries(res.outline)[i-1][1]}>
                                    <img src="/picture/download-icon.png" height="20" className="middle" style={{'paddingLeft': '20px'}}></img>
                                </a>
                            )
                        }
                    }

                    if (res.files.includes(element + '.mkv') || res.files.includes(element + '.mp4')) {
                        // VIDEO TYPE FILE

                        var source = res.files.includes(element + '.mkv') ? element + '.mkv': element + '.mp4'
                        source = `/${paths[2]}/${paths[3]}/${paths[4]}/${source}`
                        
                        var taskCaption = ""
                        if (element == 'lesson') {
                            taskCaption = "Lesson"
                        } else {
                            taskCaption = "Task " + element.toUpperCase()
                        }

                        tasks.push(
                            <figure className="tasks name">
                                <video width="300" height="300" controls>
                                    <source src={source} type="video/mp4"></source>
                                </video> 
                                <b><figcaption>{taskCaption} {downloadbutton}</figcaption></b>
                            </figure>
                        )
                    } else if (res.files.includes(element + '.pdf')) {
                        // PDF TYPE FILE
                        var source = element+'.pdf'
                        source = `/${paths[2]}/${paths[3]}/${paths[4]}/${source}`
                        
                        var imgsource = `/${paths[2]}/${paths[3]}/${paths[4]}/${element}`

                        ;['.jpg', '.png', '.jpeg'].some(function (imgType) {
                            console.log(element+imgType)
                            if (res.files.includes(element + imgType)) {
                                imgsource += imgType
                                return
                            }
                        })

                        var taskCaption = ""
                        if (element == 'lesson') {
                            taskCaption = "Lesson"
                        } else {
                            taskCaption = "Task " + element.toUpperCase()
                        }

                        tasks.push(
                            <figure className="tasks name">
                                <a href={source}>
                                    <img width="300" height="300" src={imgsource}></img>
                                </a>
                                <b><figcaption>{taskCaption} {downloadbutton}</figcaption></b>
                                
                            </figure>
                        )
                    }
                    i++;
                });

                this.setState({
                    result: res,
                    tasks: tasks
                })
            }
        }
    }

    render() {
        if(!this.state)
            return null;

        return (
            <div className="name wedopic">
                {this.state.lesson}
                {this.state.tasks}
            </div>
        );
    }
}

const domContainer2 = document.getElementsByClassName("Whole");
for (let element of domContainer2) {
    const root2 = ReactDOM.createRoot(element);
    root2.render(<Whole />);
}
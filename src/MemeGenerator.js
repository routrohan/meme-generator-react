import React from 'react'
import style from './style.css'
class MemeGenerator extends React.Component {
        constructor() {
            super();
            this.state = {
                top_text : "",
                bottom_text: "",
                random_img: "http://i.imgflip.com/1bij.jpg",
                allMemeImage: []
            }
            this.handleChange = this.handleChange.bind(this)
            this.handleSubmit = this.handleSubmit.bind(this)
        }
        componentDidMount(){
            fetch("https://api.imgflip.com/get_memes")
            .then(
                        response => response.json()
                )
            .then(response=>{
                const {memes} = response.data
                console.log(memes[0])
                this.setState({allMemeImage:memes})
            })

        }

        handleChange(event) {
            const {name,value} = event.target
            this.setState({
                [name]:value
            })
        }

        handleSubmit(event) {
            event.preventDefault()
            const randNum = Math.floor(Math.random()*this.state.allMemeImage.length)
            const randMemeImg = this.state.allMemeImage[randNum].url
            this.setState({
                random_img : randMemeImg
            })
        }

        render() {
            return(<div >
                <form className="meme-form" onSubmit={this.handleSubmit}>

                    <input type="text" name="top_text" placeholder="top text" value={this.state.top_text} onChange={this.handleChange} /> <br /><br />

                    <input type="text" name="bottom_text" placeholder="bottom text" value={this.state.bottom_text} onChange={this.handleChange} /> <br /><br />

                    <button>Generate!</button> <br /> <br />

                </form>
                <div className="meme">
                    <img src={this.state.random_img} alt="" />
                    <h2 className="top">{this.state.top_text}</h2>
                    <h2 className="bottom">{this.state.bottom_text}</h2>
                </div>
            </div>)
        }
}


export default MemeGenerator    
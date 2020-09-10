import React from 'react'
import { Button, Form, Input} from "reactstrap";

export default class FestivalApplication extends React.Component {

    state = {
        artist: this.props.artist,
        festival: this.props.festival
    }

    generateForm = () => {
        return(
            <Form onSubmit={(e) => this.handleSumbit(e)}>
                <label>Piece Title</label>
                <Input name="title" placeholder="Title" type="text" onChange={this.handleOnChange}/>
                <br></br>
                <label>Cover Image</label>
                <Input name="image" placeholder="Upload Cover Image" type="file" accept="image/*" onChange={this.handleOnChange}/>
                <br></br>
                <label>Description</label>
                <Input name="description" placeholder="Description" type="text" maxlength="500" onChange={this.handleOnChange}/>
                <br></br>
                <label>Trailer</label>
                <Input name="trailer_id" placeholder="Upload Trailer" type="text" onChange={this.handleOnChange}/>
                <br></br>
                <label>Full Video</label>
                <Input name="full_video_id" placeholder="Upload Full Length Video" type="text" onChange={this.handleOnChange}/>
                <br></br>
                <Button className="btn-round" variant='secondary' type="submit">Submit</Button>
                <Button className="btn-round" variant='secondary' onClick={(e) => this.props.handleMenuSelection(e, 'upcomingfestivals')}>Back</Button>
            </Form>
        )
    }

    handleOnChange = (e) => {
        let name = e.target.name
        if(name === 'image'){
            this.setState({
                [name]: e.target.files[0]
            })
        }
        else{
            this.setState({
                [name]: e.target.value
            })
        }
    }

    handleSumbit = (e) => {
        e.preventDefault()

        // check to be sure none are empty
        // if empty, alert and don't fetch
        if(this.state.title && this.state.image && this.state.description && this.state.trailer_id && this.state.full_video_id){
            let {artist, festival, title, image, description, trailer_id, full_video_id} = this.state
            let piece = {
                artist_id: artist.id, 
                festival_id: festival.id, 
                title, 
                image, 
                description, 
                trailer_id, 
                full_video_id
            }
            this.props.createPiece(piece)
        }
        else{
            alert("Must include all fields.")
        }
    }

    render() {
        return (
            <div className="settings">
                
                <div className="settings-form">
                    <h1>Apply for "{this.props.festival ? this.props.festival.title : "a"}" Festival</h1>
                    <br></br>
                    {this.generateForm()}
                </div>
                
            </div>
        )
    }
}
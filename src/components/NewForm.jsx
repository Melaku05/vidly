import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";

class New extends Form {
    state = {
        data: { _id: "", genre: "", title: "" },
        errors: {},
    };
    
    schema = {
        _id: Joi.string().required().label("id"),
        genre: Joi.string().required().label("genre"),

    };

    doSubmit = () => {
        console.log("Submitted");
    }

    render() {
        return (
            <div>
                <h1>New Post</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput("_id", "id")}
                    {this.renderInput("genre", "genre")}
                    {this.renderButton("Submit")}
                </form>
            </div>
        );
    }

}

export default New;
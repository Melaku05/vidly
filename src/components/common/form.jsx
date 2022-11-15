import React, { Component } from 'react';
import Joi from 'joi-browser';
import Input from './input';
// Joi for validation library
class Form extends Component {
  state = {
    data: {},
    errors: {},
  };
  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };
  validateProperty = ({ name, value }) => {
    Joi.validate({ name: value }, { name: this.schema[name] }, (err, value) => {
      if (err) return err.details[0].message;
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    // call the server
    const errors = this.validate(); //this is the object of errors
    console.log(errors);
    this.setState({ errors: errors || {} }); //if there is no errors, set the errors to empty object
    if (errors) return; //if there is an error, we don't want to call the server
    this.doSubmit();
  };
  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };
  renderButton(label) {
    return (
      <button disabled={this.validate()} className="btn btn-primary">
        {label}
      </button>
    );
  }

  renderSelect(name, label, options) {
    const { data, errors } = this.state;
    return (
      <select
        name={name}
        value={data[name]}
        label={label}
        options={options}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }
  renderInput(name, label, type = 'text') {
    const { data, errors } = this.state;
    return (
      <div className="form-group">
        <Input
          name={name}
          value={data[name]}
          type={type}
          label={label}
          onChange={this.handleChange}
          error={errors[name]}
        />
        {errors[name] && (
          <div className="alert alert-danger">{errors[name]}</div>
        )}
      </div>
    );
  }
}

export default Form;

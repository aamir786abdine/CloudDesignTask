import React, { Component } from "react";
import http from "../services/httpService";

class AddtaskForm extends Component {
  state = { form: { title: "", description: "", date: "" }, media1: null };

  async componentDidMount() {
    let { id } = this.props.match.params;
    if (id) {
      try {
        let resp = await http.get(`/task/${+id}`);
        let { data } = resp;
        console.log(data[0].date);
        let date1 = data[0].date.substring(0, 16);
        console.log(date1);
        this.setState({
          form: {
            title: data[0].title,
            description: data[0].description,
            date: date1,
          },
          fullData: data,
        });
      } catch (error) {
        this.setState({ form: { title: "", description: "", date: "" } });
      }
    }
  }

  handleChange = (e) => {
    let { currentTarget: input } = e;
    let s1 = { ...this.state };
    if (input.type === "file") {
      console.log(e.target.files[0].name);
      s1.media1 = e.target.files[0];
    } else {
      s1.form[input.name] = input.value;
      console.log(input.value);
    }
    this.setState(s1);
  };

  async postData(url, obj) {
    try {
      let response = await http.post(url, obj);
      console.log(response);
      alert("Succenfully added task");
      this.props.history.push("/");
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  }

  async putData(url, obj) {
    try {
      let response = await http.update(url, obj);
      alert("Succenfully Updated");
      this.props.history.push("/");
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let { id } = this.props.match.params;
    let { form, media1, fullData } = this.state;
    if (id) {
      let data = {
        title: form.title,
        description: form.description,
        date: form.date,
        status: fullData[0].current_status,
      };
      console.log("Data", data);
      this.putData(`/task/edit/${+id}`, data);
    } else {
      const data = new FormData();
      data.append("file", media1);
      let form1 = JSON.stringify(form);
      data.append("form", form1);
      this.postData("/addTask", data);
    }
  };

  render() {
    let { title, description, date } = this.state.form;
    let { id } = this.props.match.params;

    return (
      <div className="container">
        <h4>{id ? "Edit Task Details" : "Add New Task Details"}</h4>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            name="title"
            value={title}
            placeholder="Enter Title"
            type="text"
            className="form-control"
            onChange={this.handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <input
            name="description"
            value={description}
            placeholder="Enter Description"
            type="text"
            className="form-control"
            onChange={this.handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Date & Time</label>
          <input
            type="datetime-local"
            name="date"
            id="date"
            value={date}
            className="form-control"
            onChange={this.handleChange}
          ></input>
        </div>
        <div className="mb-3">
          <label className="form-label">Upload File</label>
          <input
            name="media"
            type="file"
            className="form-control"
            disabled={id}
            onChange={this.handleChange}
          />
        </div>
        <div className="mb-3">
          <button className="btn btn-primary" onClick={this.handleSubmit}>
            {id ? "Update Task" : "Add Task"}
          </button>
        </div>
      </div>
    );
  }
}
export default AddtaskForm;

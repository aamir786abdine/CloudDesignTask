import React, { Component } from "react";
import http from "../services/httpService";

class Home extends Component {
  state = {};
  async fetchData() {
    try {
      let response = await http.get("/tasks");
      console.log(response);
      let { data } = response;
      this.setState({
        openTask: data.openTask,
        progressTask: data.progressTask,
        completedTask: data.completedTask,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevprops) {
    if (prevprops !== this.props) this.fetchData();
  }

  async delData(url) {
    try {
      let resp = await http.remove(url);
      alert("Successfully deleted");
      this.props.history.push("/");
    } catch (error) {
      alert("Something went wrong data not deleted");
    }
  }

  handleDelete = (id) => {
    this.delData(`/task/remove/${id}`);
  };

  handleEdit = (id) => {
    this.props.history.push(`/edit/task/${id}`);
  };

  async putData(url, obj) {
    try {
      let response = await http.update(url, obj);
      this.props.history.push("/");
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  }

  handleMove = (t1) => {
    let status =
      t1.current_status === "open"
        ? "in-progress"
        : t1.current_status === "in-progress"
        ? "completed"
        : "";
    let data = {
      title: t1.title,
      description: t1.description,
      date: t1.date,
      status: status,
    };
    this.putData(`/task/edit/${t1.id}`, data);
  };

  render() {
    let { openTask, progressTask, completedTask } = this.state;
    if (!openTask && !progressTask && !completedTask) return "";
    return (
      <div className="container bg-light my-3">
        <div className="row py-2 fw-bold text-center">
          <div className="col-4">Open Task</div>
          <div className="col-4">In-progress Task</div>
          <div className="col-4">Completed Task</div>
        </div>

        <div className="row pb-3">
          <div className="col-4">
            {openTask.map((t1, index) => (
              <div
                className="row ms-2 me-2 p-2 bg-white border"
                key={index}
                style={{ fontWeight: "" }}
              >
                <div className="col-8">{t1.title}</div>
                <div className="col-4 text-end">
                  <span className="px-1">
                    <i
                      className="fas fa-edit text-secondary"
                      onClick={() => this.handleEdit(t1.id)}
                    ></i>
                  </span>
                  <span className="px-1">
                    <i
                      className="fas fa-trash text-danger"
                      onClick={() => this.handleDelete(t1.id)}
                    ></i>
                  </span>
                  <span className="px-1">
                    <i
                      className="fa fa-arrow-right"
                      onClick={() => this.handleMove(t1)}
                    ></i>
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="col-4">
            {progressTask.map((t1, index) => (
              <div
                className="row ms-2 me-2 p-2 bg-white border"
                key={index}
                style={{ fontWeight: "" }}
              >
                <div className="col-8">{t1.title}</div>
                <div className="col-4">
                  <span className="px-1">
                    <i
                      className="fas fa-edit text-secondary"
                      onClick={() => this.handleEdit(t1.id)}
                    ></i>
                  </span>
                  <span className="px-1">
                    <i
                      className="fas fa-trash text-danger"
                      onClick={() => this.handleDelete(t1.id)}
                    ></i>
                  </span>
                  <span className="px-1">
                    <i
                      className="fa fa-arrow-right"
                      onClick={() => this.handleMove(t1)}
                    ></i>
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="col-4">
            {completedTask.map((t1, index) => (
              <div
                className="row ms-2 me-2 p-2 bg-white border"
                key={index}
                style={{ fontWeight: "" }}
              >
                <div className="col-8">{t1.title}</div>
                <div className="col-4 text-end">
                  <span>
                    <i
                      className="fas fa-trash text-danger"
                      onClick={() => this.handleDelete(t1.id)}
                    ></i>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
export default Home;

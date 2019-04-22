import React, { Component } from "react";
import http from "./services/httpService";
import config from "./config.json";
import { ToastContainer, toast } from "react-toastify";
import logger from "./services/loggerService";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

class App extends Component {
  state = {
    posts: []
  };

  async componentDidMount() {
    const { data: posts } = await http.get(config.apiEndPoint);
    this.setState({ posts });
  }

  handleAdd = async () => {
    const obj = { title: "a", body: "Body" };
    const { data: post } = await http.post(config.apiEndPoint, obj);
    const posts = [post, ...this.state.posts];
    this.setState({ posts });
  };

  handleUpdate = async post => {
    post.title = "Updated TITLE";
    await http.put(config.apiEndPoint + "/" + post.id, post);
    const posts = [...this.state.posts];
    const index = posts.indexOf(post);
    post[index] = { ...post };
    this.setState({ posts });
  };

  handleDelete = async post => {
    const originalPosts = this.state.posts;
    const posts = this.state.posts.filter(p => p.id !== post.id);
    this.setState({ posts });
    try {
      await http.delete(config.apiEndPoint + "/600");
    } catch (error) {
      if (error.response && error.response.status === 404) {
        logger.log(error);
        toast("This post has already been deleted!");
      }
      this.setState({ posts: originalPosts });
    }
  };

  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <button className="btn btn-primary" onClick={this.handleAdd}>
          Add
        </button>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map(post => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => this.handleUpdate(post)}
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => this.handleDelete(post)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default App;

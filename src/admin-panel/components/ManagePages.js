import React, { Component } from "react";
import { Button } from "@material-ui/core";
import { Icon } from "antd";
import { DeletePage } from "../../services";

export default class ManagePages extends Component {
  render() {
    const { pages } = this.props;
    return (
      <div className="w3-container" style={{ overflowX: "auto" }}>
        {pages && pages.length !== 0 ? (
          <>
            <a href="/manage/pages">
              <h5 className="mt-3">
                <b>
                  <i className="fa fa-list-alt"></i> &nbsp; Manage Pages
                </b>
              </h5>
            </a>
            <table className="table table-striped table-responsive-lg">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Title</th>
                  <th scope="col">Body</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pages.map((page, index) => (
                  <tr key={index}>
                    <th scope="row" style={{ width: 25 }}>
                      {index + 1}
                    </th>
                    <td>{page.title}</td>
                    <td className="manage-description">
                      {page.body}
                    </td>
                    <td className="actions">
                      <Button
                        variant="contained"
                        color="default"
                        onClick={() =>
                          (document.location.href = `/page/${page.title}`)
                        }
                      >
                        <Icon type="eye" />
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() =>
                          (document.location.href = `/edit/page/${page.id}`)
                        }
                      >
                        <Icon type="edit" />
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => {
                          DeletePage(page.id, "/manage/pages");
                        }}
                      >
                        <Icon type="delete" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <hr />
            <p>You can also add new pages by clicking the button below.</p>
            <Button
              variant="outlined"
              onClick={() => (document.location.href = "/add/pages")}
            >
              Add New Page
            </Button>
            <hr />
          </>
        ) : (
          <>
            <hr />
            <h5 className="mt-3">
              <b>
                <i className="fa fa-list-alt"></i> &nbsp; Manage Pages
              </b>
            </h5>
            <h3 className="text-dark">No pages were found on the database.</h3>
            <Button
              variant="outlined"
              onClick={() => (document.location.href = "/add/pages")}
            >
              Add New Pages
            </Button>
            <hr />
          </>
        )}
      </div>
    );
  }
}

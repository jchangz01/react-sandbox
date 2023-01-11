import React from "react";
import UserCard from "../components/UserCard";
import InputFilter from "../components/InputFilter";
import "./css/UserGenerator.css";

export default class SearchView extends React.Component {
  state = {
    generated_user: null,
    saved_users: [],
    max_users_shown: 3,
    users_per_rows: 1,
    filter_str: "",
  };

  fetchUser = () => {
    fetch("https://randomuser.me/api/")
      .then((res) => res.json())
      .then((data) => {
        data = data.results[0];
        console.log(data);
        const user = {
          img: data.picture.large,
          name: data.name.first + " " + data.name.last,
          username: data.login.username,
          gender: data.gender,
          city: data.location.city,
          email: data.email,
          phone: data.cell,
        };
        console.log(user);
        this.setState({ generated_user: user });
      });
  };

  saveUser = () => {
    if (this.state.saved_users.slice(-1)[0] !== this.state.generated_user) {
      this.setState({
        saved_users: [...this.state.saved_users, this.state.generated_user],
      });
    }
  };

  filter = (phrase, filter) => phrase.indexOf(filter) !== -1;
  handleFilterStrChange = (newFilterStr) => {
    this.setState({ filter_str: newFilterStr });
  };

  setMaxUserShown = () => {
    if (this.state.users_per_rows === 1)
      this.setState({ max_users_shown: this.state.max_users_shown + 3 });
    else if (this.state.users_per_rows === 2)
      this.setState({ max_users_shown: this.state.max_users_shown + 4 });
  };

  // we use componentDidUpdate for practicing purposes only
  // the optimal method would be to declare a function that is
  // invoked specifically when "Display per row" is changed
  componentDidUpdate(prevProps, prevState) {
    console.log("update");
    if (prevState.users_per_rows !== this.state.users_per_rows) {
      if (this.state.users_per_rows === 1) {
        let rows = this.state.max_users_shown / 4;
        this.setState({ max_users_shown: rows * 3 });
      } else if (this.state.users_per_rows === 2) {
        let rows = this.state.max_users_shown / 3;
        this.setState({ max_users_shown: rows * 4 });
      }
    }
  }

  componentDidMount() {
    this.fetchUser();
  }

  render() {
    const {
      generated_user,
      saved_users,
      users_per_rows,
      max_users_shown,
      filter_str,
    } = this.state;

    const SavedUsersFiltered = saved_users.filter((user) => {
      return this.filter(user.name, filter_str);
    });
    const SavedUsersDisplay = SavedUsersFiltered.reverse()
      .slice(0, max_users_shown)
      .map((user) => {
        return (
          <div
            style={{ flexBasis: 100 / users_per_rows + "%" }}
            key={user.username}
          >
            <UserCard userInfo={user} />
          </div>
        );
      });

    return (
      <div className="usergen-content">
        <header>
          <div className="usergen-hd-container">
            <h1>Random User Generator</h1>
          </div>
        </header>
        <section>
          <div className="usergen-sec-container">
            <h2 className="usergen-sec-title">Generate New User</h2>
            <UserCard userInfo={generated_user} />
            <div className="usergen-btn-container">
              <button onClick={this.fetchUser} className="usergen-btn">
                New User
              </button>
              <button onClick={this.saveUser} className="usergen-btn">
                Save User
              </button>
            </div>
          </div>
        </section>
        <section>
          <div className="usergen-sec-container" style={{ border: "none" }}>
            <h2 className="usergen-sec-title">Saved Users </h2>
            <InputFilter
              filterStr={filter_str}
              changeFilterStr={this.handleFilterStrChange}
              results_count={saved_users.length}
            />
            <small>Display per row: </small>
            <select
              value={users_per_rows}
              onChange={(e) =>
                this.setState({ users_per_rows: parseInt(e.target.value) })
              }
            >
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
          </div>
        </section>
        <section style={{ marginBottom: "40px" }}>
          <div className="usergen-user-cards-content">{SavedUsersDisplay}</div>
          {SavedUsersFiltered.length > max_users_shown ? (
            <p className="usergen-show-more" onClick={this.setMaxUserShown}>
              Show more users
            </p>
          ) : null}
        </section>
      </div>
    );
  }
}

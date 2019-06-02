import React from "react";
import PropTypes from "prop-types";
import {
  AppBar,
  Toolbar,
  InputBase,
  Button,
  Menu,
  MenuItem
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import { navigate } from "@reach/router";
import SearchBox from "./SearchBox";

const styles = theme => ({
  root: {
    width: "100%"
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  toolbar: theme.mixins.toolbar
});

class Header extends React.Component {
  state = {
    search: "",
    usernameInput: null,
    anchorEl: null,
    loggedInUser: null,
    isDesktop: false
  };

  componentDidMount() {
    const width = window.innerWidth;
    if (width > 700) {
      this.setState({ isDesktop: true });
    }
    window.addEventListener("resize", this.handleResize);
  }

  handleResize = () => {
    const width = window.innerWidth;
    if (width > 700) {
      this.setState({ isDesktop: true });
    } else if (width < 700) {
      this.setState({ isDesktop: false });
    }
  };

  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;
    return (
      <div className={classes.root}>
        <div className={classes.toolbar} />
        <AppBar position='fixed'>
          <Toolbar>
            <div>
              <Button
                aria-owns={anchorEl ? "menu" : undefined}
                aria-haspopup='true'
                onClick={this.handleClick}
              >
                <MenuIcon />
              </Button>
              <Menu
                id='menu'
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={this.handleClose}
              >
                {this.props.loggedInUser ? (
                  <div>
                    <MenuItem onClick={this.logOut}>Logout</MenuItem>
                    <MenuItem onClick={this.profile}>
                      {this.props.loggedInUser}'s Profile
                    </MenuItem>
                  </div>
                ) : (
                  <div>
                    <MenuItem>
                      <form onSubmit={this.submitUsername}>
                        Username:{"  "}
                        <InputBase
                          type='text'
                          onChange={this.handleInput}
                          placeholder='E.g.: jessjelly'
                        />
                      </form>
                    </MenuItem>
                  </div>
                )}
                {this.state.isDesktop === false ? (
                  <div>
                    {" "}
                    <MenuItem onClick={this.goHome}>Home</MenuItem>
                    <MenuItem onClick={this.goTopics}> Topics </MenuItem>
                  </div>
                ) : null}
              </Menu>
            </div>
            <Button
              href='/'
              size='large'
              className={classes.title}
              variant='text'
              color='inherit'
              nowrap='true'
            >
              NC News
            </Button>{" "}
            <div className={classes.grow} />
            <Button
              href='/topics'
              className={classes.title}
              color='inherit'
              nowrap='true'
            >
              Topics
            </Button>
            <Button
              href='/'
              className={classes.title}
              color='inherit'
              nowrap='true'
            >
              Home
            </Button>
            <SearchBox
              submitSearch={this.submitSearch}
              updateSearch={this.updateSearch}
              value={this.state.search}
              clearSearchBox={this.clearSearchBox}
            />
          </Toolbar>
        </AppBar>
      </div>
    );
  }

  updateSearch = e => {
    this.setState({ search: e.target.value });
  };

  submitSearch = e => {
    e.preventDefault();
    this.props.basicSearch(this.state.search);
    this.setState({ search: "" });
  };
  clearSearchBox = () => {
    this.setState({ search: "" });
  };
  exitSearch = () => {
    this.props.basicSearch("");
    this.setState({ search: "" });
  };

  handleInput = e => {
    this.setState({ usernameInput: e.target.value });
  };

  submitUsername = e => {
    e.preventDefault();
    this.props.setUsername(this.state.usernameInput);
  };

  logOut = e => {
    this.props.logOut();
    this.handleClose();
  };

  profile = () => {
    navigate(`/users/${this.props.loggedInUser}`);
    this.handleClose();
  };
  goHome = () => {
    navigate("/");
    this.props.basicSearch("");
    this.setState({ search: "" });
    this.handleClose();
  };
  goTopics = () => {
    navigate("/topics");
    this.setState({ search: "" });
    this.handleClose();
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };
}

Header.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Header);

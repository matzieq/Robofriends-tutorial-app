import React, {Component} from 'react';
import { connect } from 'react-redux';
import CardList from '../components/CardList';
import Searchbox from '../components/Searchbox';
import Scroll from "../components/Scroll";
import './App.css';

import { setSearchField } from '../actions';

const mapStateToProps = state => ({
    searchField: state.searchField
});

const mapDispatchToProps = dispatch => ({
    onSearchChange: event => dispatch(setSearchField(event.target.value))
})

class App extends Component {
    constructor() {
        super();
        this.state = {
            robots: []
        }
    }


    componentDidMount() {
        console.log(this.props.store);
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(users => {
                this.setState({
                    robots: users
                })
            });
    }

    // onSearchChange = (event) => {

    //     this.setState({
    //         searchField: event.target.value
    //     });
        
    // }
    
    render() {
        const {searchField} = this.props;
        if (this.state.robots.length === 0) return <h1>Loading...</h1>
        const filteredRobots = this.state.robots.filter(robot => robot.name.toLowerCase().includes(searchField.toLowerCase()));
        return (
            <div className="tc">
                <h1 className="f1">Robofriends</h1>
                <Searchbox searchChange = { this.props.onSearchChange }/>
                <Scroll>
                    <CardList robots = { filteredRobots }/>
                </Scroll>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
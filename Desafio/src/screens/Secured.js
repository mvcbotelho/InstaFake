import React, { Component } from 'react';
import {
    FlatList,
    Text,
    ScrollView,
    Button,
    StyleSheet,
    View
} from 'react-native';
import Photo from '../components/Photo'

export default class Secured extends Component {
    constructor(props){
        super(props);
        this.state = {
            photos: []
        }
    }

    componentDidMount(){
        fetch('https://instalura-api.herokuapp.com/api/public/fotos/rafael')
            .then(res => res.json())
            .then(json => this.setState({ photos: json }))
    }
    render(){
        // const photos = [
        //     {id: 1, name: 'Dog 001', link: '../images/dog001.jpg'},
        //     {id: 2, name: 'Dog 002', link: '../images/dog002.jpg'},
        //     {id: 3, name: 'Dog 003', link: '../images/dog003.jpg'}
        //     ];

        return(

            <ScrollView style={styles.main}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>InstaFake</Text>
                </View>
                <FlatList style={styles.container}
                    data={this.state.photos}
                    keyExtractor={photo => photo.id}
                    renderItem={ ({item}) =>
                        <Photo foto={item} />
                    }
                />
                <Button
                    onPress={this.props.onLogoutPress}
                    title='Sair'
                />
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    main: {
        marginTop: 20
    },
    container: {
        marginTop: 10,
        flex: 1,
    },
    header: {
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerText: {
        fontSize: 30,
        fontWeight: 'bold'
    }
});
import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    TextInput,
    StyleSheet,
    Dimensions,
    TouchableOpacity
} from 'react-native';

const width = Dimensions.get('screen').width;

export default class Photo extends Component {
    constructor(props){
        super(props);
        this.state = {
            foto: this.props.foto,
            valorComentario: ''
        }
    }

    carregaIcone(likeada){
        return likeada ? require('../images/s2-checked.png') : require('../images/s2.png')
    }

    exibeLikes(likers){
        if (likers.length <= 0 )
            return;
        return (
            <Text style={styles.like}>
                { likers.length } { likers.length > 1 ? 'curtidas' : 'curtida' }
            </Text>
        );
    }

    exibeLegenda(foto) {
        if(foto.comentario === '')
            return;
        return (
        <View style={styles.comentario}>
            <Text style={styles.tituloComentario}>{foto.loginUsuario}</Text>
            <Text>{foto.comentario}</Text>
        </View>
        );
    }

    addComentario(){
        if(this.state.valorComentario === '')
            return;

        const novaLista = [
            ...this.state.foto.comentarios,
            {
                id: this.state.valorComentario,
                login: 'meuUsuario',
                texto: this.state.valorComentario
            }
        ];
        const fotoAtualizada = {
            ...this.state.foto,
            comentarios: novaLista
        };

        this.setState({ foto: fotoAtualizada, valorComentario: '' });
        this.inputComentario.clear();
    }

    like() {
        const { foto } = this.state;
        let novaLista = [];
        if(!foto.likeada) {
            novaLista = [
                ...foto.likers,
                {login: 'meuUsuario'}
            ]
        } else {
            novaLista = foto.likers.filter( liker => {
                return liker.login !== 'meuUsuario'
            })
        }

        const fotoAtualizada = {
            ...foto,
            likeada: !foto.likeada,
            likers: novaLista
        };

        this.setState({ foto: fotoAtualizada })
    }
    render(){
        const { foto } = this.state;
        return(
            <View>
                <View style={styles.cabecalho}>
                    <Image source={{ uri: foto.urlPerfil }}
                    style={ styles.fotoDePerfil }/>
                    <Text>{foto.loginUsuario}</Text>
                </View>
                <Image source={{uri: foto.urlFoto}}
                       style={ styles.foto }/>
                <View style={ styles.rodape }>
                    <TouchableOpacity onPress={this.like.bind(this)}>
                        <Image style={ styles.botaoDeLike} source={this.carregaIcone(foto.likeada)}/>
                    </TouchableOpacity>
                    {this.exibeLikes(foto.likers)}
                    {this.exibeLegenda(foto)}
                    {foto.comentarios.map( comentario =>
                        <View key={comentario.id} style={styles.comentario}>
                            <Text style={styles.tituloComentario}>{comentario.login}</Text>
                            <Text>{comentario.texto}</Text>
                        </View>
                    )}
                    <View style={styles.novoComentario}>
                        <TextInput style={styles.input}
                                   placeholder='Adicione um comentário...'
                                   ref={input => this.inputComentario = input}
                                   onChangeText={texto => this.setState({ valorComentario: texto })}
                        />
                        <TouchableOpacity onPress={this.addComentario.bind(this)}>
                            <Image style={styles.icone}
                                   source={require('../images/dog001.jpg')}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    cabecalho: {
        margin: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    fotoDePerfil: {
        marginRight: 10,
        borderRadius: 20,
        width: 40,
        height: 40
    },
    foto: {
        width: width,
        height: width
    },
    botaoDeLike: {
        marginBottom: 10,
        width: 40,
        height: 40
    },
    rodape: {
        margin: 10
    },
    like: {
        fontWeight: 'bold'
    },
    comentario: {
        flexDirection: 'row'
    },
    tituloComentario: {
        fontWeight: 'bold',
        marginRight: 5
    },
    input:{
        flex: 1,
        height: 40
    },
    icone: {
        width: 30,
        height: 30
    },
    novoComentario: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd'
    }
});
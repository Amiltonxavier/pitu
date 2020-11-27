import React from 'react';
import Header from '../../components/Header';
import { Container } from 'react-bootstrap';
import ShortenerService from '../../services/shortenerService';
import { parseISO, formatRelative } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { StatsContainer, StatsRow, StatsBox, StatsBoxTitle } from './styles';

class StatsPage extends React.Component {
 constructor(props){
    super(props);
    this.state = {
        isLoading: false,
        shortenedURL: {},
        errorMessage: '',
    }
 }

 async componentDidMount() {
     const { code } = this.props.match.params;

     try{
        const services = new ShortenerService();
        const shortenedURL = await services.getStats(code);

        const parsedDate = parseISO(shortenedURL.updatedAt);
        const currentDate = new Date();
        const relativeDate = formatRelative(parsedDate, currentDate, {
            locale: ptBR,
        });

        shortenedURL.relativeDate = relativeDate;

        this.setState({ isLoading: false, shortenedURL })
     }catch(error){
        this.setState({ isLoading: false, errorMessage: 'Ops, a url solicitada não existe.' });
     }
 }

 render(){
     const { errorMessage, shortenedURL } = this.state;
     return(
         <Container>
             <Header>Estatíticas</Header>
             {errorMessage ? (
                    <StatsContainer className="text-center">
                        <FontAwesomeIcon size="3x" color="#f8d7da" icon="exclamation-triangle" />
                         <p className="m-3">{errorMessage}</p>
                         <a className="btn btn-primary" href="/">Encurtar nova URL</a>
                    </StatsContainer>
                 ) : (
                        <StatsContainer className="text-center">
                        <p><b>https://pitu.tk/${shortenedURL.code}</b></p>
                         <p>Redireciona para:<b>{shortenedURL.url}</b></p>
                            <StatsRow>
                                <StatsBox>
                                     <b>{shortenedURL.hits}</b>
                                     <StatsBoxTitle>Visitas</StatsBoxTitle>
                                </StatsBox>
                                <StatsBox>
                                     <b>{shortenedURL.relativeDate}</b>
                                     <StatsBoxTitle>última visita</StatsBoxTitle>
                                </StatsBox>
                                <a className="btn btn-primary" href="/">Encurtar nova URL</a>
                            </StatsRow>
                        </StatsContainer>
                 )}
         </Container>
     )
 }
}

export default StatsPage;
import { History } from 'history';
import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { LanguageModel } from '../model/language.model';
import '../style/language.scss';

export interface Props {
    language: LanguageModel;
    history: History;
}

export const Language: React.FC<Props> = ({language, history}) => {
    return (
        <div className='col-4 mb-5'>
            <Card style={{width: '18rem'}}>
                <Card.Img variant="top" src={require(`../images/${language.name}.png`)}/>
                <Card.Body>
                    <Card.Title>{language.name}</Card.Title>
                    <Card.Text>{language.summary}</Card.Text>
                    <Button variant="primary" onClick={() => history.push(`/details/${language.id}`)}>Details</Button>
                </Card.Body>
            </Card>
        </div>
    );
};

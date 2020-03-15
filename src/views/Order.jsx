import React from "react";
import PriceQuotations from "../components/Oder/PriceQuotations";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Input,
  Row,
  Col
} from "reactstrap";

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      purchase: [{ createUser: 1, observation: "teste" }],
      Quotations: [],
      maxQuotations: [1, 2, 3, 4, 5],
      numQuotation: [1, 2, 3]
    };
    this.addQuotations = this.addQuotations.bind(this);
  }

  addQuotations(data) {
    console.log(data);
  }

  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <h5 className="title">Pedido de Compra</h5>
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col className="pr-md-1" md="6">
                      <FormGroup>
                        <label>Area</label>
                        <Input
                          defaultValue="Informatica"
                          disabled
                          placeholder="Informatica"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="px-md-1" md="6">
                      <FormGroup>
                        <label>Username</label>
                        <Input
                          defaultValue={sessionStorage.getItem("userName")}
                          placeholder="Username"
                          type="text"
                          disabled
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-md-1" md="12">
                      <FormGroup>
                        <label>Descricao do Produto</label>
                        <Input
                          placeholder="Digite uma breve descricao"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
          {/* componente aqui */}
          {this.state.numQuotation.map(qt => {
            return (
              <PriceQuotations
                addQuotations={this.addQuotations}
                nOrder={qt}
                key={qt}
              />
            );
          })}

          <Button className="btn-fill" color="primary">
            Save
          </Button>
        </div>
      </>
    );
  }
}

export default UserProfile;

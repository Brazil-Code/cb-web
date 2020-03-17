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
      purchase: { createUser: 1, observation: "teste" },
      Quotations: [],
      maxQuotations: [1, 2, 3, 4, 5],
      numQuotation: [1, 2, 3]
    };
    this.addQuotations = this.addQuotations.bind(this);
    this.FinishQuotations = this.FinishQuotations.bind(this);
  }

  addQuotations(data) {
    let Quotations = [];
    let equats = false;
    Quotations.push(...this.state.Quotations);
    Quotations.map(qt => {
      if (qt.key === data.key) {
        qt.link = data.link;
        qt.unitValue = data.unitValue;
        qt.purchaseItem = data.purchaseItem;
        qt.amount = data.amount;
        qt.totalValue = data.totalValue;
        qt.file = data.file;
        equats = true;
      }
    });
    if (equats === false) {
      Quotations.push(data);
    }
    this.setState({ Quotations });
    console.log(this.state.Quotations);
  }

  FinishQuotations() {
    let priceQuotations = this.state.Quotations;
    let obj = { ...this.state.purchase, priceQuotations };

    console.log(obj);
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

          <Button
            className="btn-fill"
            color="info"
            onClick={this.FinishQuotations}
          >
            Finalizar
          </Button>
        </div>
      </>
    );
  }
}

export default UserProfile;

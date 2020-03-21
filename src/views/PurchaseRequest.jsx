import React from "react";
import PriceQuotations from "../components/PriceQuotation/PriceQuotations";
import req from "../api/priceQuotations";
import getToken from "../services/login";
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
      observation: "",
      purchase: { createUser: sessionStorage.getItem("id") },
      Quotations: [],
      maxQuotations: [1, 2, 3, 4, 5],
      numQuotation: [1, 2, 3]
    };
    this.addQuotations = this.addQuotations.bind(this);
    this.FinishQuotations = this.FinishQuotations.bind(this);
    this.addPurchase = this.addPurchase.bind(this);
  }

  async addPurchase() {
    let purchase = await {
      ...this.state.purchase,
      purchaseItem: this.state.observation
    };
    this.setState({ purchase });
    console.log(this.state.purchase);
  }

  addQuotations(data) {
    let Quotations = [];
    let equats = false;
    Quotations.push(...this.state.Quotations);

    Quotations.map(qt => {
      if (qt.key === data.key) {
        qt.link = data.link;
        qt.unitValue = data.unitValue;
        qt.observation = data.observation;
        qt.amount = data.amount;
        qt.totalValue = data.totalValue;
        qt.file = data.file;
        equats = true;
      }
    });
    if (equats === false) {
      Quotations.push(data);
    }
    console.log(this.state.Quotations);
    return this.setState({ Quotations });
  }

  FinishQuotations() {
    let priceQuotations = this.state.Quotations;
    let obj = { ...this.state.purchase, priceQuotations };
    Headers.console.log(req.addQuotations(obj));
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
                        <label>Área</label>
                        <Input
                          defaultValue="Informatica"
                          disabled
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="px-md-1" md="6">
                      <FormGroup>
                        <label>Usuário</label>
                        <Input
                          defaultValue={sessionStorage.getItem("userName")}
                          type="text"
                          disabled
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-md-1" md="12">
                      <FormGroup>
                        <label>Descrição do produto:</label>
                        <Input
                          placeholder="Observações gerais sobre o produto"
                          type="text"
                          value={this.state.observation}
                          onChange={e =>
                            this.setState({ observation: e.target.value })
                          }
                        />
                      </FormGroup>
                      <Button
                        className="btn-fill"
                        size="sm"
                        color="primary"
                        onClick={this.addPurchase}
                      >
                        salvar
                      </Button>
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
                nQuotation={qt}
                key={qt}
              />
            );
          })}

          <Button
            className="btn-fill"
            color="info"
            onClick={this.FinishQuotations}
          >
            Enviar Pedido
          </Button>
        </div>
      </>
    );
  }
}

export default UserProfile;

import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Input,
  Row,
  Col,
  Button
} from "reactstrap";

class PriceQuotations extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      key: this.props.nQuotation,
      link: "",
      unitValue: "",
      observation: "",
      amount: "",
      totalValue: 0,
      file: ""
    };

    this.totalValue = this.totalValue.bind(this);
    this.addQuotations = this.addQuotations.bind(this);
  }

  totalValue = () => {
    this.setState({ totalValue: this.state.amount * this.state.unitValue });
  };

  async addQuotations() {
    let data = {
      key: await this.state.key,
      link: await this.state.link,
      unitValue: await this.state.unitValue,
      observation: await this.state.observation,
      amount: await this.state.amount,
      totalValue: await this.state.totalValue,
      file: await this.state.file
    };

    await this.props.addQuotations(data);
  }

  render() {
    return (
      <Row onClick={this.totalValue}>
        <Col md="12">
          <Card>
            <CardHeader>
              <h5 className="title">{this.props.nQuotation}° Cotação</h5>
            </CardHeader>

            <CardBody>
              <Row>
                <Col className="pr-md-1" md="3">
                  <FormGroup>
                    <label>Link URL:</label>
                    <Input
                      placeholder="http://expemplo.com/produto"
                      type="text"
                      value={this.state.link}
                      onChange={e => this.setState({ link: e.target.value })}
                    />
                  </FormGroup>
                </Col>

                <Col className="px-md-1" md="3">
                  <FormGroup>
                    <label>Valor Unitário</label>
                    <Input
                      placeholder="R$"
                      value={this.state.unitValue}
                      onChange={e =>
                        this.setState({ unitValue: e.target.value })
                      }
                      name="price"
                      type="number"
                    />
                  </FormGroup>
                </Col>

                <Col className="px-md-1" md="3">
                  <FormGroup>
                    <label>Quantidade</label>
                    <Input
                      type="text"
                      value={this.state.amount}
                      type="number"
                      onChange={e => this.setState({ amount: e.target.value })}
                    />
                  </FormGroup>
                </Col>

                <Col className="px-md-1" md="3">
                  <FormGroup>
                    <label>Total</label>
                    <Input
                      type="text"
                      value={ "R$ " + this.state.totalValue }
                      onChange={e =>
                        this.setState({ totalValue: e.target.value })
                      }
                      disabled
                    />
                  </FormGroup>
                </Col>

                <Col className="px-md-3" md="12">
                  <FormGroup>
                    <label>Observação</label>
                    <Input
                      type="text"
                      value={this.state.observation}
                      onChange={e =>
                        this.setState({ observation: e.target.value })
                      }
                    />
                  </FormGroup>
                  <Button
                    size="sm"
                    className="btn-fill"
                    color="primary"
                    onClick={this.addQuotations}
                  >
                    salvar
                  </Button>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default PriceQuotations;

import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Input,
  Row,
  Col
} from "reactstrap";
class PriceQuotations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      link: "",
      unitValue: 0,
      purchaseItem: "",
      amount: 0,
      totalValue: 0,
      file: ""
    };
  }

  render() {
    return (
      <Row>
        <Col md="12">
          <Card>
            <CardHeader>
              <h5 className="title">Ordem {this.props.nOrder}</h5>
            </CardHeader>
            <CardBody>
              <Row>
                <Col className="pr-md-1" md="3">
                  <FormGroup>
                    <label>link URL:</label>
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
                    <label>Preço</label>
                    <Input
                      placeholder="R$:"
                      value={this.state.unitValue}
                      onChange={e =>
                        this.setState({ unitValue: e.target.value })
                      }
                      name="price"
                      type="text"
                    />
                  </FormGroup>
                </Col>
                <Col className="px-md-1" md="3">
                  <FormGroup>
                    <label>Quantidade</label>
                    <Input
                      placeholder="Quantidade de prudtudo"
                      type="text"
                      value={this.state.amount}
                      onChange={e => this.setState({ amount: e.target.value })}
                    />
                  </FormGroup>
                </Col>
                <Col className="px-md-1" md="3">
                  <FormGroup>
                    <label>Total</label>
                    <Input
                      type="text"
                      value={this.state.totalValue}
                      onChange={e =>
                        this.setState({ totalValue: e.target.value })
                      }
                      disabled
                    />
                  </FormGroup>
                </Col>
                <Col className="px-md-3" md="12">
                  <FormGroup>
                    <label>Observacao</label>
                    <Input
                      type="text"
                      value={this.state.purchaseItem}
                      onChange={e =>
                        this.setState({ purchaseItem: e.target.value })
                      }
                    />
                  </FormGroup>
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

import React, { Component } from "react";
import {
  Input,
  Button,
  Icon,
  Modal,
  Popconfirm,
  message,
  InputNumber,
  Rate
} from "antd";
import { ServerAdapter } from "../../../api/adapter";

export default class AccountingPage extends Component {
  componentDidMount() {
    ServerAdapter.post().then(res => {
      console.log(res);
    });
  }

  addItem = e => {
    const { value } = e.target;
    this.props.store.accounting.addItem(value);
  };

  deleteItemsList = () => {
    this.props.store.accounting.deleteItems();
    message.success("completed delete all items!");
  };

  onChangeFee = (number, item) => {
    this.props.store.accounting.onChangeFee(item.name, number);
  };

  onChangeRate = (item, value) => {
    this.props.store.accounting.onChangeRate(item.name, value);
  };

  doSettlement = item => {
    this.props.store.accounting.doSettlement(item.name);
  };

  deleteItem = item => {
    this.props.store.accounting.deleteItem(item.name);
  };

  render() {
    const { getItems } = this.props.store.accounting;
    const items = getItems.map(item => {
      return item;
    });

    return (
      <div id="home-component">
        <div className="accounting-item-input">
          <InputItem onPressEnter={this.addItem} />
        </div>
        <CustomPopConfirm
          title="delete items?"
          onConfirm={this.deleteItemsList}
          onText="delete completed!"
        >
          <div className="accounting-clear-button">
            <ClearButton />
          </div>
        </CustomPopConfirm>
        <ListItems
          items={items}
          onChangeFee={this.onChangeFee}
          onChangeRate={this.onChangeRate}
          doSettlement={this.doSettlement}
          deleteItem={this.deleteItem}
        />
      </div>
    );
  }
}

const InputItem = ({ disabled, onPressEnter, allowClear = true }) => {
  return (
    <div className="input-mobile">
      <Input
        type="text"
        allowClear
        onPressEnter={onPressEnter}
        disabled={disabled}
        allowClear={allowClear}
      />
    </div>
  );
};

const ListItems = ({ items, onChangeFee, doSettlement, onChangeRate, deleteItem }) => {
  const item = items.map((item, idx) => (
    <li className="list" key={idx}>
      <h3 className="item-name">{item.name}</h3>
      <ItemRate
        onChange={value => onChangeRate(item, value)}
        disabled={item.isConfirmed}
      >
        <div className="input-number">
          <InputItem
            disabled={item.isConfirmed}
            onPressEnter={e => onChangeFee(e.target.value, item)}
            allowClear={false}
          />
        </div>

        <Button type="primary" onClick={() => doSettlement(item)}>
          Confirm
        </Button>
        <div className="item-delete-button">
          <ClearButton disabled={item.isConfirmed} onClick={() => deleteItem(item)} />
        </div>
      </ItemRate>
      {item.fee}
    </li>
  ));
  return <ul>{item}</ul>;
};

const ClearButton = ({
  onClick,
  text,
  className = "delete-icon",
  spin = false,
  disabled=false
}) => {
  return (
    <Button disabled={disabled} className={className} onClick={onClick}>
      <Icon style={{ color: "white" }} type="delete" theme="outlined" />
      {text}
    </Button>
  );
};

const ModalExample = ({ title, visible, onOk, onCancel }) => {
  return (
    <Modal
      title="Basic Modal"
      visible={visible}
      onOk={onOk}
      onCancel={onCancel}
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Modal>
  );
};

const CustomPopConfirm = ({
  children,
  title,
  onConfirm,
  onCancel,
  okText,
  cancelText
}) => {
  return (
    <Popconfirm
      title={title}
      placement="bottom"
      onConfirm={onConfirm}
      onCancel={onCancel}
      okText="Yes"
      cancelText="No"
    >
      {children}
    </Popconfirm>
  );
};

const ItemRate = ({ children, onChange, disabled }) => {
  return (
    <div>
      {children}
      <Rate onChange={onChange} disabled={disabled} />
    </div>
  );
};

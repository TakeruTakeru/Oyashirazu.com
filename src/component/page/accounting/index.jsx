import React, { Component } from "react";
import {
  Input,
  Button,
  Icon,
  Modal,
  Popconfirm,
  message,
  Rate,
  Empty,
  Statistic
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
        <TotalPriceDisplay items={items}></TotalPriceDisplay>
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

const InputItem = ({ disabled, onChange, onPressEnter, allowClear = true }) => {
  return (
    <div className="input-mobile">
      <Input
        type="text"
        allowClear
        onPressEnter={onPressEnter}
        onChange={onChange}
        disabled={disabled}
        allowClear={allowClear}
      />
    </div>
  );
};

const ListItems = ({
  items,
  onChangeFee,
  doSettlement,
  onChangeRate,
  deleteItem
}) => {
  if (items.length < 1) return <EmptyDisplay />;
  const item = items.map((item, idx) => (
    <li className="list" key={idx}>
      <h3 className="item-name">{item.name}</h3>
     <PriceDisplay price={item.fee} />
      <ItemRate
        onChange={value => onChangeRate(item, value)}
        disabled={item.isConfirmed}
      >
        <div className="input-number">
          <InputItem
            disabled={item.isConfirmed}
            onChange={e => onChangeFee(e.target.value, item)}
            allowClear={false}
          />
        </div>
        <Button
          disabled={item.isConfirmed}
          type="primary"
          onClick={() => doSettlement(item)}
        >
          Confirm
        </Button>
        <div className="item-delete-button">
          <ClearButton
            disabled={item.isConfirmed}
            onClick={() => deleteItem(item)}
          />
        </div>
      </ItemRate>
     
    </li>
  ));
  return <ul>{item}</ul>;
};

const ClearButton = ({
  onClick,
  text,
  className = "delete-icon",
  spin = false,
  disabled = false
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

const PriceDisplay = ({ price }) => {
  const style = price > 1000 ? { color: '#FD151B'} : {color: "#136F63"}
  return (
    <div>
      <Statistic value={price} suffix={'円'} valueStyle={style}></Statistic>
    </div>
  )
};

const TotalPriceDisplay = ({ items }) => {
  const totalFeesList = items.map(item => {
    return item.fee;
  })
  const reducer = (accumulater, value) => accumulater + value;
  const totalFee = totalFeesList.length > 0 ? totalFeesList.reduce(reducer) : '0'
  return (
    <div>
      <PriceDisplay price={totalFee} />
    </div>
  )
}

const EmptyDisplay = () => {
  return (
    <div className="imao-wrapper">
      <Empty image="../../../static/imao.jpg" />
    </div>
  );
};

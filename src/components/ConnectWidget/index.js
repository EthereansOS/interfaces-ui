import React, { useState } from 'react'
import T from 'prop-types'
import classNames from 'classnames'
import { webs3States } from '@ethereansos/interfaces-core'

import { Button, Typography } from '../../design-system'
import { Modal } from '../../design-system'

import style from './connect-widget.module.scss'

const ConnectWidget = ({
  logo,
  onClickConnect,
  title,
  rotateLogo,
  className,
  connect,
  connectionStatus,
}) => {
  const [modalOpen, setModalOpen] = useState(false)

  const onClick = () => {
    setModalOpen(true)
    onClickConnect?.()
  }

  const onConnectorClicked = (provider) => {
    setModalOpen(false)
    connect(provider)
  }

  return (
    <div className={classNames(style['root'], className)}>
      {logo ? (
        <img
          src={logo}
          alt="logo"
          className={classNames({ [style.rotateLogo]: !!rotateLogo })}
        />
      ) : null}
      <Typography variant="h1" color="primary">
        {title}
      </Typography>
      <br />
      {connectionStatus === webs3States.CONNECTED && <div>Connected</div>}
      {connectionStatus === webs3States.CONNECTING && <div>Connecting</div>}
      {connectionStatus === webs3States.NOT_CONNECTED && (
        <>
          <Button onClick={onClick} text="Connect" variant="primary" />
          <br />
          <Typography variant="body2" align="center">
            You need a{' '}
            <a href="https://etherscan.io/directory/Wallet">Web3 Enabler</a> to
            use this Dapp - If you have problems connecting, refresh the page.
          </Typography>
        </>
      )}
      <Modal centered visible={!!modalOpen}>
        <div className={style.modalHeader}>
          <Typography variant="h5">Connect to a wallet</Typography>
          <Button text="Close" onClick={() => setModalOpen(false)} />
        </div>
        <Button
          className={style.button}
          text="Metamask"
          onClick={() => onConnectorClicked('injected')}
        />
        <Button
          className={style.button}
          text="Wallet Connect"
          onClick={() => onConnectorClicked('walletconnect')}
        />
        <Button
          className={style.button}
          text="Wallet Link"
          onClick={() => onConnectorClicked('walletlink')}
        />
        <Button
          className={style.button}
          text="Torus"
          onClick={() => onConnectorClicked('torus')}
        />
        <Button
          className={style.button}
          text="Frame"
          onClick={() => onConnectorClicked('frame')}
        />
        <Button
          className={style.button}
          text="Authereum"
          onClick={() => onConnectorClicked('authereum')}
        />
      </Modal>
    </div>
  )
}

ConnectWidget.propTypes = {
  logo: T.string,
  onClickConnect: T.func,
  connect: T.func.isRequired,
  connectionStatus: T.string.isRequired,
  title: T.string,
  className: T.string,
  connectError: T.string,
  rotateLogo: T.bool,
}

export default ConnectWidget

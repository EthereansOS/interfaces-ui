import React, { useState } from 'react'
import classNames from 'classnames'
import T from 'prop-types'

import { Token, Button, Typography, Card } from '../../design-system'

import Swap from './Swap'
import Transfer from './Transfer'
import style from './balance.module.scss'

const Balance = ({
  className,
  showActions = false,
  token,
  tokenAmount,
  tokenPrice,
  onTransferSubmit,
  onSwapSubmit,
}) => {
  const [isSwap, setIsSwap] = useState(false)
  const [isTransfer, setIsTransfer] = useState(false)

  if (!tokenAmount || tokenAmount === '0') return null

  return (
    <Card className={classNames(style.root, className)}>
      <div className={style.token}>
        <Token symbol={token.symbol} logo={token.logo} />
        {!!tokenPrice && (
          <Typography variant="body1" fontFamily="primary">
            (${tokenPrice})
          </Typography>
        )}
      </div>
      {!!tokenAmount && (
        <Typography variant="h5" weight="bold" fontFamily="primary">
          {tokenAmount}
        </Typography>
      )}
      {showActions && (
        <div className={style.actions}>
          <Button
            text="Swap"
            size="small"
            color={isSwap ? 'secondary' : 'primary'}
            onClick={() => {
              setIsTransfer(false)
              setIsSwap(true)
            }}
          />
          <Button
            text="Transfer"
            size="small"
            color={isTransfer ? 'secondary' : 'primary'}
            onClick={() => {
              setIsSwap(false)
              setIsTransfer(true)
            }}
          />
        </div>
      )}
      {isSwap && <Swap token={token} onSwapSubmit={onSwapSubmit} />}
      {isTransfer && (
        <Transfer onTransferSubmit={onTransferSubmit} token={token} />
      )}
    </Card>
  )
}

Balance.propTypes = {
  className: T.string,
  showActions: T.bool,
  token: T.shape({
    symbol: T.string,
    logo: T.string,
  }).isRequired,
  tokenPrice: T.oneOfType([T.string, T.number]),
  tokenAmount: T.string,
  onSwapSubmit: T.func,
  onTransferSubmit: T.func,
}

export default Balance

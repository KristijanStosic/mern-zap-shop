import React from 'react'
import { Helmet } from 'react-helmet'

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
        <title>{title}</title>
        <meta name='description' content={description} />
      <meta name='keyword' content={keywords} />
    </Helmet>
  )
}

Meta.defaultProps = {
    title: 'Welcome to ZapShop',
    keywords: 'board games, games shop, cheap games',
    description: 'We sell the best products for cheap',
  }

export default Meta
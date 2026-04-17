import baseClasses from '@components/Themes/layout.module.scss'
import estilosmodulescss from 'dist/css/estilos.module.scss'
import Phaser from 'phaser'
import React, { FunctionComponent } from 'react'

import Start from './Scenes/Start'

import Container from '@mui/material/Container'
import Game from './Scenes/Game'

const Dashboard: FunctionComponent = (props: any) => {
  const {
    history: navigation,
    match: { params },
  } = props
  const classes = baseClasses
  const [lang, setlang] = React.useState<any>('en')
  const theme = { ...baseClasses, ...estilosmodulescss }
  const config_IT3SuQyn: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    parent: 'IT3SuQyn',

    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
    },

    width: 600,
    height: 600,

    scene: [new Start(), new Game()],

    physics: {
      default: 'arcade',
      arcade: {
        debug: false,

        gravity: { x: 0, y: 0 },
      },
    },
    dom: {
      createContainer: true,
    },
  }
  React.useEffect(() => {
    new Phaser.Game(config_IT3SuQyn)
  }, [])

  // Theme selection

  React.useEffect(() => {
    if (typeof langStrings !== 'undefined') {
      setlang(langStrings[localStorage.getItem('aptugolang') || 'en'])
    }
  }, [])

  return (
    <React.Fragment>
      <div className={theme.pages}>
        <Container className={theme.container} maxWidth="md">
          <div id="IT3SuQyn" className={theme.phaser}></div>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default Dashboard

import React from 'react'
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import {useFormControls} from './ContactFormControls'
import Markdown from 'markdown-to-jsx'
import {Alert} from '@material-ui/lab'

const useStyles = makeStyles((theme: Theme) =>
   createStyles({
      textFieldRoot: {
         margin: '15px 0px'
      },
      setFontSize: {
         fontSize: 14,
         borderRadius: 0
      },
      setButton: {
         fontSize: 14,
         height: 35,
         borderRadius: 0
      },

      inputBase: {}
   })
)

const inputFieldValues = [
   {
      name: 'fullName',
      label: 'Full Name',
      id: 'my-name'
   },
   {
      name: 'email',
      label: 'Email',
      id: 'my-email'
   },
   {
      name: 'message',
      label: 'Message',
      id: 'my-message',
      multiline: true,
      rows: 8
   }
]

export const ContactForm = ({content}) => {
   const {handleInputValue, handleFormSubmit, formIsValid, errors, isSuccess} = useFormControls()
   const classes = useStyles()
   return (
      <div className="gen-wrapper-events events-guidelines-background">
         <h1 className="gen-subheading-rest">HOW TO ANNOUNCE OTHER BEAM DYNAMICS EVENTS</h1>
         <div className="ws-how-to-outer-box">
            <div className="ws-how-to-inner-box">
               <p className="ws-how-to-intro-text">
                  <Markdown>{content.introduction ? content.introduction : null}</Markdown>
               </p>
               <form autoComplete="off" onSubmit={handleFormSubmit}>
                  {inputFieldValues.map((inputFieldValue, index) => {
                     return (
                        <TextField
                           key={index}
                           classes={{root: classes.textFieldRoot}}
                           InputProps={{classes: {root: classes.setFontSize}}}
                           InputLabelProps={{classes: {root: classes.setFontSize}}}
                           onChange={handleInputValue}
                           onBlur={handleInputValue}
                           name={inputFieldValue.name}
                           label={inputFieldValue.label}
                           multiline={inputFieldValue.multiline ?? false}
                           fullWidth
                           rows={inputFieldValue.rows ?? 1}
                           autoComplete="off"
                           variant="outlined"
                           {...(errors[inputFieldValue.name] && {
                              error: true,
                              helperText: errors[inputFieldValue.name]
                           })}
                        />
                     )
                  })}
                  <Button
                     fullWidth
                     classes={{root: classes.setButton}}
                     variant="contained"
                     type="submit"
                     color="primary"
                     disabled={!formIsValid()}
                  >
                     Send
                  </Button>
                  {isSuccess() == true ? (
                     <Alert style={{width: '100%', fontSize: 15}} severity="success">
                        Thank you for reaching out to us! Our admins will get back to as soon as
                        possible!
                     </Alert>
                  ) : null}
               </form>
            </div>
         </div>
      </div>
   )
}

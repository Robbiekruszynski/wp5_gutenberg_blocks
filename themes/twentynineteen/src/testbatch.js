const { registerBlockType } = wp.blocks;
const { RichText, InspectorControls, ColorPalette } = wp.editor;
const { PanelBody } = wp.components;

registerBlockType('customblocktwo/custom-cta', {
  //built-in attributes
  title: 'Test Batch',
  description:'Block to generate a custom test batch',
  icon: 'format-image',
  category:'layout',

  //custom attributes
  attributes: {
    title: {
      type: 'string',
      source: "html",
      selector: "h2"
    },

    titleColor: {
      type: 'string',
      default: 'black'
    },

    body: {
      type: 'string',
      source: 'html',
      selector: 'p'
    }
  },


  // built-in functions
  edit({ attributes, setAttributes }){

    const {
      title,
      body,
      titleColor
    } = attributes;

    //custom functions

    function onChangeTitle(newTitle) {
      setAttributes ( { title: newTitle  } );
    }

    function onChangeBody(newBody) {
      setAttributes( { body: newBody } );
    }

    function onTitleColorChange(newColor) {
      setAttributes( { titleColor: newColor } );
    }

    return ([

      <InspectorControls style= { { marginBottom:'40px' } }>
        <PanelBody title= { 'Font Color Settings' }>
          <p><strong>Select a Title Color:</strong></p>
          <ColorPalette value={ titleColor }
                        onChange={ onTitleColorChange } />

        </PanelBody>
      </InspectorControls>,

      <div class="cta-container">

        <RichText key="editable"
                    tagName="h2"
                    placeholder= "Your title"
                    value={ title }
                    onChange={ onChangeTitle }
                    style={ { color: titleColor } }/>
        <RichText key="editable"
                    tagName="p"
                    placeholder= "Your paragraph"
                    value={ body }
                    onChange={ onChangeBody }/>
      </div>
    ]);
  },

  save( {attributes} ) {

    const {
      title,
      body,
      titleColor
    } = attributes;

    return (
      <div class="cta-container">
      <h2 style={{ color: titleColor }}> { title } </h2>
      <RichText.Content tagName="p"
                        value={ body }
                        />
      </div>

    )
  }

});

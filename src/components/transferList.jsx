import { Button, Checkbox, Grid, List, ListItem, ListItemIcon, ListItemText, Paper } from '@mui/material';
import React, { useEffect } from 'react';
import { serviciosURL } from '../server/server';

function not(a, b) {
    return a.filter((value) => b.indexOf(value) === -1);
  }
  
function intersection(a, b) {
    return a.filter((value) => b.indexOf(value) !== -1);
}

const TransferList = ({servicios, setServicios}) => {
    
    const [checked, setChecked] = React.useState([]);
    const [left, setLeft] = React.useState([]);
    useEffect(()=> {
      fetch(serviciosURL)
      .then((response) => response.json())
      .then((jsonDatos)=>{
  
        let rigthList=[]
        for (let item in jsonDatos){
          rigthList.push(jsonDatos[item].tipoServicio)
        }
    
          var result = rigthList.filter(servicio => !servicios.includes(servicio));
          setLeft(result)
      })
      .catch((error) => console.log(error));
  }, [servicios]);

    const leftChecked = intersection(checked, left);
    const rightChecked = intersection(checked, servicios);
    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];
    
        if (currentIndex === -1) {
          newChecked.push(value);
        } else {
          newChecked.splice(currentIndex, 1);
        }
    
        setChecked(newChecked);
      };

    const handleAllRight = () => {
    setServicios(servicios.concat(left));
    setLeft([]);
    };

    const handleCheckedRight = () => {
    setServicios(servicios.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
    };

    const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setServicios(not(servicios, rightChecked));
    setChecked(not(checked, rightChecked));
    };

    const handleAllLeft = () => {
    setLeft(left.concat(servicios));
    setServicios([]);
    };
    
    const customList = (items) => (
        <Paper sx={{ width: 200, height: 230, overflow: 'auto' }}>
          <List dense component="div" role="list">
            {items.map((value) => {
              const labelId = `transfer-list-item-${value}-label`;
    
              return (
                <ListItem
                  key={value}
                  role="listitem"
                  button
                  onClick={handleToggle(value)}
                >
                  <ListItemIcon>
                    <Checkbox
                      checked={checked.indexOf(value) !== -1}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{
                        'aria-labelledby': labelId,
                      }}
                    />
                  </ListItemIcon>
                  <ListItemText id={labelId} primary={value} />
                </ListItem>
              );
            })}
          </List>
        </Paper>
      );


    return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item>{customList(left)}</Grid>
        <Grid item>
          <Grid container direction="column" alignItems="center">
            <Button
              sx={{ my: 0.5 }}
              variant="outlined"
              size="small"
              onClick={handleAllRight}
              disabled={left.length === 0}
              aria-label="move all right"
            >
              ≫
            </Button>
            <Button
              sx={{ my: 0.5 }}
              variant="outlined"
              size="small"
              onClick={handleCheckedRight}
              disabled={leftChecked.length === 0}
              aria-label="move selected right"
            >
              &gt;
            </Button>
            <Button
              sx={{ my: 0.5 }}
              variant="outlined"
              size="small"
              onClick={handleCheckedLeft}
              disabled={rightChecked.length === 0}
              aria-label="move selected left"
            >
              &lt;
            </Button>
            <Button
              sx={{ my: 0.5 }}
              variant="outlined"
              size="small"
              onClick={handleAllLeft}
              disabled={servicios.length === 0}
              aria-label="move all left"
            >
              ≪
            </Button>
          </Grid>
        </Grid>
        <Grid item>{customList(servicios)}</Grid>
      </Grid>
    );
}

export default TransferList;

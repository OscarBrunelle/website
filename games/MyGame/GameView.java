import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.*;

/**
 * The class <b>GameView</b> provides the current view of the entire Game. It extends
 * <b>JFrame</b> and lays out a matrix of <b>DotButton</b> (the actual game) and
 * two instances of JButton. The action listener for the buttons is the controller.
 *
 * @author Guy-Vincent Jourdan, University of Ottawa
 */

public class GameView extends JFrame {

    private LandsButton[][] board;
    private GameModel gameModel;
    private JLabel nbreOfStepsLabel = new JLabel("Number Of Steps: 0");


    /**
     * Constructor used for initializing the Frame
     *
     * @param gameModel
     *            the model of the game (already initialized)
     * @param gameController
     *            the controller
     */

    public GameView(GameModel gameModel, GameController gameController) {

        super("Minesweeper : Assignment 2");
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setBackground(Color.WHITE);

        this.gameModel=gameModel;
/*
        JPanel dots = new JPanel();
        dots.setLayout(new GridLayout(h,w));


        board = new DotButton[h][w];
        for (int i=0; i<h; i++) {
            for (int j=0; j<w; j++) {
                board[i][j]= new DotButton(i,j,DotButton.COVERED);
                board[i][j].addActionListener(gameController);
                dots.add(board[i][j]);
            }
        }*/

        JButton reset = new JButton("Reset");
        reset.addActionListener(gameController);

        JButton exit = new JButton("Exit");
        exit.addActionListener(gameController);

        JPanel buttons = new JPanel();
        buttons.setBackground(Color.WHITE);
        buttons.add(reset);
        buttons.add(exit);
        buttons.add(nbreOfStepsLabel);
        /*
        add(dots, BorderLayout.CENTER);*/
        add(buttons, BorderLayout.SOUTH);
/*
        pack();*/
        setVisible(true);

        update();

        repaint();
    }

    /**
     * update the status of the board's DotButton instances based
     * on the current game model, then redraws the view
     */

    public void update(){


        nbreOfStepsLabel.setText("Number Of Steps: ");

        repaint();
    }
}
